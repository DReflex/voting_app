import React from 'react'
import SocialLogin from 'react-social-login'
import '../navbar.css'
const Button = ({ triggerLogin, ...props }) => (
<div onClick={triggerLogin} {...props} className="fLogin"><img src="https://cdn.worldvectorlogo.com/logos/facebook-3.svg" alt="#" /></div>
)

export default SocialLogin(Button)
