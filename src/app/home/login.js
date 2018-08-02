import React from 'react';
import SocialButton from './create-div';
import { connect } from 'react-redux';
import { userLogin } from '../../actions/index'
class Login extends React.Component {
  constructor(){
    super();
    this.RandomColor = this.RandomColor.bind(this);
  }
  RandomColor (){
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
 }


  handleSocialLogin = (user) => {
  console.log(user)
  fetch(`/api/user/${user._profile.id}`)
  .then((res) => {
    if(res.status === 404){
      fetch('/api/user', {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify({
                  nickname: "Mr. " + this.RandomColor(),
                  id: user._profile.id,
                  accessToken: user._token.accessToken,
                  expiresAt:user._token.expiresAt
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    }
    else{
      return res.json()
    }
  })
  .then(() => {
      fetch(`/api/user/${user._profile.id}`, {
                method: 'PUT',
                mode:"CROS",
                body: JSON.stringify({
                  accessToken: user._token.accessToken,
                  expiresAt:user._token.expiresAt
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    })
    .then(()=>{
    let loginStatus;
    let time = user._token.expiresAt;
    let timeNow = Date.now();
    (time >= timeNow) ? loginStatus = true : loginStatus = false;
    let data ={
      id: user._profile.id,
      loginStatus: loginStatus
    }
    this.props.dispatch(userLogin(data))
  })

}

handleSocialLoginFailure = (err) => {
  console.error(err)
}

  render(){
    return(
        <SocialButton
      provider='facebook'
      appId='354675081620273'
      onLoginSuccess={this.handleSocialLogin}
      onLoginFailure={this.handleSocialLoginFailure}
    >
    </SocialButton>
    )
  }
}
const store = (store) =>{
  return {
    user: store.user
  }
}

Login = connect(store)(Login)

export default Login
