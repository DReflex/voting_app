import React from 'react';
import { Link } from 'react-router-dom'
import './navbar.css';
import Login from './user/login';
import { connect } from 'react-redux'
import Logout from './user/logout'
class Navbar extends React.Component{
  constructor(){
    super();
  }
  render(){

    return(
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="/">Voting App</Link>
            <div className="chart"><img src="http://aymix.org/en/wp-content/uploads/2016/12/grafico.png" alt="#"/></div>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav navbar-right">
              <li> <Link to="/"><i className="fa fa-home" aria-hidden="true"></i>Home</Link> </li>
              <li> <Link to="/poll"><i className="fa fa-pie-chart" aria-hidden="true"></i>Poll</Link></li>
              <li> <Link to="/user"><i className="fa fa-user" aria-hidden="true"></i>User</Link></li>
              <li>{this.props.user.loginStatus? <Logout/>:<Login/>}</li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
const store = (store) =>{
  return {
    user: store.user
  }
}
Navbar = connect(store)(Navbar)

export default Navbar
