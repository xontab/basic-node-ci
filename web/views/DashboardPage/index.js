import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

import Loader from '../../components/common/Loader';

import {
    getFormattedDate,
    getFormattedTime,
    getStatusCode
} from '../../helpers/formatting';

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

    _handleExecuteClick(id) {
        this.props.executeApp(id);
    }

    _renderAppsRows = (data, i) => {
        const id = data.get('id');
        const updatedTime = getFormattedTime(data.getIn(['lastLog', 'date']));
        const nextExecutionDate = getFormattedTime(data.get('nextExecutionDate'));
        const status = getStatusCode(data.get('status'));
        const statusClean = status.toLowerCase().replace(' ', '-');

        return (
            <TableRow key={i} className={globalStyles[statusClean]}>
                <TableRowColumn>{data.get('id')}</TableRowColumn>
                <TableRowColumn width="55px">{updatedTime}</TableRowColumn>
                <TableRowColumn width="55px">{nextExecutionDate}</TableRowColumn>
                <TableRowColumn className={globalStyles.wrap} width="330px">{data.getIn(['lastLog', 'text'])}</TableRowColumn>
                <TableRowColumn>{status}</TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        label="Execute"
                        primary={true}
                        disabled={status === 'Processing'}
                        onClick={() => this._handleExecuteClick(id)}
                    />
                </TableRowColumn>
            </TableRow>
        );
    }

    _renderAppsTable(data) {
        return (
            <Table selectable={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn width="55px">Updated On</TableHeaderColumn>
                        <TableHeaderColumn width="55px">Next Execute</TableHeaderColumn>
                        <TableHeaderColumn width="330px">Last Status Log</TableHeaderColumn>
                        <TableHeaderColumn>Status</TableHeaderColumn>
                        <TableHeaderColumn>Actions</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    { data && data.map(this._renderAppsRows) }
                </TableBody>
            </Table>
        );
    }
    
    render() {
        const { apps } = this.props;
        const data = apps.get('data');
        const receivedAt = getFormattedDate(apps.get('receivedAt'));

        return (
            <div>
                <h1>Running Apps
                    {
                        receivedAt
                        && <span>Updated on: {receivedAt}</span>
                    }
                </h1>
                {
                    this.isLoading
                    ? <Loader />
                    : this._renderAppsTable(data)
                }
            </div>
        )
    }
}