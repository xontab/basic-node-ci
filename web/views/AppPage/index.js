import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

import Loader from '../../components/common/Loader';

import {
    getFormattedDate,
    getFormattedTime,
    getStatusCode
} from '../../helpers/formatting';

import { 
    fetchLogs,
} from '../../redux/actions/logsActions';

import globalStyles from '../../layout/styles.scss';

@connect(
  (state, props) => ({
    logs: state.getIn(['logs', 'apps', props.params.id]),
  }),
  {
    fetchLogs,
  },
)
export default class AppPage extends Component {  
    constructor (props) {
        super(props)
        
        this.isLoading = true;
    }
    
    componentDidMount() {
        this._fetchLogs();
        this.interval = setInterval(this._fetchLogs.bind(this), 2000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }
        
    componentWillReceiveProps(nextProps) {
        if (this.isLoading && nextProps.logs && !nextProps.logs.get('isFetching')) {
            this.isLoading = false;
        }
    }

    _fetchLogs() {
        const { logs } = this.props;

        if (!logs || !logs.get('isFetching')) {
            this.props.fetchLogs(this.props.params.id);
        }
    }

    _renderAppsTable(data) {
        return (
            <Table selectable={false}>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn width="55px">Updated On</TableHeaderColumn>
                        <TableHeaderColumn width="75px">Status</TableHeaderColumn>
                        <TableHeaderColumn>Remark</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    { data && data.reverse().map(this._renderAppsRows) }
                </TableBody>
            </Table>
        );
    }

    _renderAppsRows = (data, i) => {
        const updatedTime = getFormattedTime(data.get('date'));
        const status = getStatusCode(data.get('type'));
        const statusClean = status.toLowerCase().replace(' ', '-');

        return (
            <TableRow key={i} className={globalStyles[statusClean]}>
                <TableRowColumn width="55px">{updatedTime}</TableRowColumn>
                <TableRowColumn width="75px">{status}</TableRowColumn>
                <TableRowColumn>{data.get('text')}</TableRowColumn>
            </TableRow>
        );
    }
   
    render() {
        const { logs } = this.props;
        const data = logs && logs.get('data');
        const receivedAt = logs && getFormattedDate(logs.get('receivedAt'));

        return (
            <div>
                <h1>{ this.props.params.id }
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