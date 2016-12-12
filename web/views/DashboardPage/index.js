import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from '../../components/common/Loader';

import { 
    fetchApps,
    executeApp,
} from '../../redux/actions/appsActions';

import globalStyles from '../../layout/styles.scss';

@connect(
  state => ({
    apps: state.get('apps'),
  }),
  {
    fetchApps,
    executeApp,
  },
)
export default class DashboardPage extends Component {
    constructor (props) {
        super(props)
        
        this.isLoading = true;
    }
    
    componentDidMount() {
        this._fetchApps();
        this.interval = setInterval(this._fetchApps.bind(this), 2000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
        
    componentWillReceiveProps(nextProps) {
        if (this.isLoading && !nextProps.apps.get('isFetching')) {
            this.isLoading = false;
        }
    }

    _fetchApps() {
        if (!this.props.apps.get('isFetching')) {
            this.props.fetchApps();
        }
    }

    _getStatusCode(id) {
        switch(id) {
            case 0: return 'Idle';
            case 1: return 'OK';
            case 2: return 'No Changes';
            case 3: return 'Processing';
            case 4: return 'Error';
        }

        return 'Unknown';
    }


    _getFormattedDate(date) {
        if (date) {
            const dateParsed = new Date(date);
            const hours = `0${dateParsed.getHours()}`.substr(-2);
            const mins = `0${dateParsed.getMinutes()}`.substr(-2);
            const secs = `0${dateParsed.getSeconds()}`.substr(-2);
            return `${hours}:${mins}:${secs}`;
        }

        return 'Unknown';
    }

    _handleExecuteClick(id) {
        this.props.executeApp(id);
    }

    _renderAppsRows = (data, i) => {
        const id = data.get('id');
        const updatedTime = this._getFormattedDate(data.getIn(['lastLog', 'date']));
        const nextExecutionDate = this._getFormattedDate(data.get('nextExecutionDate'));
        const status = this._getStatusCode(data.get('status'));
        const statusClean = status.toLowerCase().replace(' ', '-');

        return (
            <tr key={i} className={globalStyles[statusClean]}>
                <td>{data.get('id')}</td>
                <td>{status}</td>
                <td>{updatedTime}</td>
                <td>{nextExecutionDate}</td>
                <td>{data.getIn(['lastLog', 'text'])}</td>
                <td>
                    <button 
                        disabled={status === 'Processing'}
                        onClick={() => this._handleExecuteClick(id)}
                    >Execute</button>
                </td>
            </tr>
        );
    }

    _renderAppsTable(data) {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Updated On</th>
                        <th>Next Execute</th>
                        <th>Last Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { data && data.map(this._renderAppsRows) }
                </tbody>
            </table>
        );
    }
    
    render() {
        const data = this.props.apps.get('data');

        return (
            <div>
                <h1>Running Apps</h1>
                {
                    this.isLoading
                    ? <Loader />
                    : this._renderAppsTable(data)
                }
            </div>
        )
    }
}