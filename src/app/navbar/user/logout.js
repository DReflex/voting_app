import React from 'react';
import { connect } from 'react-redux';
import { userLogout } from '../../../actions/index';
import { withRouter } from "react-router-dom";


class Logout extends React.Component{
  constructor(){
    super();
 this.handleLogout = this.handleLogout.bind(this)
  }
  handleLogout = () => {
    this.props.dispatch(userLogout());
    this.props.history.push("/");

  }
  render(){
    return(
      <div onClick={this.handleLogout}className="fLogin"><i className="fa fa-sign-out" aria-hidden="true"></i></div>
    )
  }
}

const store = (store) =>{
  return {
    user: store.user
  }
}

Logout = connect(store)(Logout)
export default withRouter(Logout)
