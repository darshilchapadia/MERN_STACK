import 'babel-polyfill';
import React from 'react';

//import ReactDOM from 'react-dom';
//import { Router, Route, Redirect, browserHistory } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import IssueAddNavItem from './IssueAddNavItem.jsx';
import withToast from './withToast.jsx';
import Header from './Header.jsx';

//const HeaderWithToast = withToast(Header);
export default class App extends React.Component{
  static dataFetcher({urlBase, cookie}) {
    const headers = cookie ? { headers : {Cookie : cookie} } : null;
    return fetch(`${urlBase || ''}/api/users/me`, headers).then(response => {
      if(!response.ok) return response.json().then(error => Promise.reject(error));
      return response.json().then(data => ({App: data}));
    });
  }

  constructor(props, context){
    super(props, context);
    const user = context.initialState.App ? context.initialState.App : {};
    this.state = {
      user,
    };
    this.onSignin = this.onSignin.bind(this);
    this.onSignout = this.onSignout.bind(this);
  }

  componentDidMount(){
    App.dataFetcher({ }).then(data =>{
    const user = data.App;
    this.setState({user});
    });
  }

  onSignin(name){
    this.setState({user: {signedIn: true, name: name} });
  }

  onSignout(name){
    this.setState({user: {signedIn: false, name : '' } });
  }

  render(){
    const childrenWithUser = React.Children.map(this.props.children,
      child => React.cloneElement(child, {user: this.state.user}) );
    return(
      <div>
        <Header user={this.state.user} onSignin={this.onSignin}
          onSignout={this.onSignout} />
        <div className="container-fluid">
          {childrenWithUser}
          <hr />
          <h5><small>
            Full source code available at  this
            <a href="https://github.com/vasansr/prop-mern-stack">Github Repository</a>
          </small></h5>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object.isRequired,
};

App.contextTypes = {
    initialState: React.PropTypes.object,
};
