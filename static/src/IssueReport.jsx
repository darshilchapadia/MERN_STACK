import React from 'react';
import {Panel, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

import IssueFilter from './IssueFilter.jsx';
import Toast from './Toast.jsx';

const statuses = ['New', 'Open', 'Assigned', 'Fixed', 'Verified', 'Closed'];

const StatRow = (props) => (
  <tr>
    <td>{props.owner}</td>
    {statuses.map((status, index)=>(<td key={index}>{props.counts[status]}</td>))}
  </tr>
);

StatRow.propTypes = {
  owner: PropTypes.string.isRequired,
  counts: PropTypes.object.isRequired,
};


export default class IssueReport extends React.Component{
  constructor(props, context){
    super(props, context);
    console.log('contexL: ', context);
    console.log("the context is : ", this.context);
    const stats = context.initialState ? context.initialState.IssueReport : {};
    this.state = {
      stats,
      toastVisible: false, toastMessage: '', toastType: 'Success',
    };
    this.setFilter = this.setFilter.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  componentDidMount(){
    this.loadData();
  }

  componentDidUpdate(prevProps){
    const oldQuery = prevProps.location.query;
    const newQuery = this.props.location.query;

    if(oldQuery.status === newQuery.status && oldQuery.effort_gte === newQuery.effort_gte && oldQuery.effort_lte == newQuery.effort_lte){
      return;
    }
    this.loadData();
  }

  setFilter(query){
    this.props.router.push({pathname: this.props.location.pathname, query});
  }

  showError(message){
    this.setState({toastVisible: true, toastMessage: message, toastType: 'danger'});
  }

  dismissToast(){
    this.setState({toastVisible: false});
  }

  loadData(){
    IssueReport.dataFetcher({location: this.props.location}).then(data=>{
      this.setState({stats: data.IssueReport});
    }).catch(err=>{
      this.showError(`Error in fetching data from server : ${error}`);
    });
  }

  render(){
    return(
      <div>
        <Panel collapsible header="Filter">
          <IssueFilter setFilter={this.setFilter} initFilter={this.props.location.query} />
        </Panel>
        <Table bordered condensed hover responsive>
          <thead>
            <tr>
              <th></th>
              {statuses.map((status, index)=> <td key={index}> {status}</td>)}
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.stats).map((owner, index)=>
            <StatRow key={index} owner={owner} counts={this.state.stats[owner]} />
          )}
          </tbody>
        </Table>
        <Toast showing={this.state.toastVisible} message={this.state.toastMessage}
          onDismiss={this.dismissToast} bsStyle={this.state.toastType} />
      </div>
    );
  }
}

IssueReport.propTypes ={
  location: PropTypes.object.isRequired,
  router: PropTypes.object,
};

IssueReport.contextTypes={
  initialState: PropTypes.object,
};
