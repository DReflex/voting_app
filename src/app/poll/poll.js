import React from 'react'
import { connect } from 'react-redux'
import { addPoll, resetRedux, resetShow, showPoll, showing } from '../../actions/index'
import './poll.css'
import PieChart from './chart.js';
import Popup from './popup/popup'

class Poll extends React.Component {
  constructor(){
    super();
    this.handleClick =this.handleClick.bind(this)
  }


  componentDidMount(){
    this.props.dispatch(resetRedux())
    fetch(`/api/${this.props.location.pathname}`).then(res => res.json()).then(data => data.map((poll)=>{
      const Data = {
        id: poll._id,
        name: poll.name,
        desc: poll.desc,
        data: poll.data,
        creator: poll.creator
      }
      return this.props.dispatch(addPoll(Data))
    })
  )




}
  //
  handleClick =(poll) => {
    const Data = {
      id: poll.id,
      name: poll.name,
      desc: poll.desc,
      data: poll.data,
      creator: poll.creator
    }
    this.props.dispatch(showPoll(poll));
    this.props.dispatch(showing("block"));
  }




  render(){
    return (
      <div className="polls-container">
        {this.props.polls.map((poll, i) =>
          <div onClick={ () =>this.handleClick(poll)} key={i} className="poll">
            <PieChart data={poll}/>
            <h3>{poll.name}</h3>
            <h5>@{poll.creator.name}</h5>
          </div>
        )}

             <Popup />
        </div>

    )
  }
}
const store = (store) =>{
  return {
    polls: store.polls,
    showPoll: store.showPoll,
    user: store.user
  }
}

Poll = connect(store)(Poll)

export default Poll
