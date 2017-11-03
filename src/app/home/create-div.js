import React from 'react'
import SocialLogin from 'react-social-login'
import './home.css'
const Button = ({ triggerLogin, ...props }) => (
  <div onClick={triggerLogin} {...props}  id="facebook" className="connect">
    <img className="logo" src="https://cdn.worldvectorlogo.com/logos/facebook-3.svg" />
    <h3>connect</h3>
  </div>
)

export default SocialLogin(Button)
