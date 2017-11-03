import React from 'react';
import { connect } from 'react-redux';
import { addPoll, resetRedux, showing, showPoll} from '../../actions/index'
import Login from './login'
import './home.css'


class Home extends React.Component {

  componentDidMount(){
    this.props.dispatch(resetRedux())
    fetch('/api/poll').then(res => res.json()).then(data => data.map((poll)=>{
      const Data = {
        id: poll._id,
        name: poll.name,
        desc: poll.desc,
        data: poll.data,
        creator: poll.creator
      }
      return this.props.dispatch(addPoll(Data))
    })

  ).then(()=>{

    this.props.dispatch(showPoll(this.props.polls[0]));
    this.props.dispatch(showing("none"))

  })

  }
  height = {
    "height": window.innerHeight -50 + "px"
  }

  render(){
    return (
      <div className="home-container">
        <div style={this.height} className="background-box">
          <div className="content-box">
            <div className="container">
              <div className="textPoll">
                <h2 className="h1Title">What is Voting App</h2>
                <p>Voting App is web app that enables you to look trough and vote on polls, create polls, add options on polls adn check on your polls </p>
              </div>
              <div className="redirect-buttons">
              { /*make rediret on created component after login is pressed*/}
                {this.props.user.loginStatus? (
                  <div onClick={()=> this.props.history.push('/user')}  id="facebook" className="connect">
                    <img className="logo" src="https://cdn.worldvectorlogo.com/logos/facebook-3.svg" />
                    <h3>Profile</h3>
                  </div>):
                  <Login/>
                }
                <div onClick={() => this.props.history.push("/poll")} className="connect">
                  <img className="logo" src="http://www.pngpix.com/wp-content/uploads/2016/10/PNGPIX-COM-Pie-Chart-PNG-Transparent-Image.png" />
                  <h3>view polls</h3>
                </div>
              </div>
            </div>

        </div>
        </div>


    </div>
    )
  }
}
const store = (store) =>{
  return {
    polls: store.polls,
    showPoll: store.showPoll,
    user:store.user
  }
}

Home = connect(store)(Home)

export default Home
