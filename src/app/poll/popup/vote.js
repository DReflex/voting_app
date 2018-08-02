import React from 'react';
import './popup.css';
import { connect } from 'react-redux';
import { addPoll, resetRedux, showing, showPoll, addOption, editOption, resetOption} from '../../../actions/index'

const uuidv4 = require('uuid/v4');


class Vote extends React.Component{
  componentDidUpdate(){
    if(this.props.showPoll.showing === "none" && this.state.valForSub.length !== 0){
      this.setState({valForSub: []})
    }

  }
  componentDidMount(){
    this.props.dispatch(resetOption())
  }
  constructor(){
    super();
    this.state={
      valForSub:[]
    }
    this.handleChange =this.handleChange.bind(this);
    this.addOption = this.addOption.bind(this);
    this.changeOption = this.changeOption.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.RandomColor = this.RandomColor.bind(this);

  }

  handleSubmit = (e)=>{
    e.preventDefault()
  let values = this.props.showPoll.data.value
  if(this.state.valForSub.length){
    values = this.state.valForSub
    console.log("values", values);
  }

  fetch(`/api/poll/${this.props.showPoll.id}`, {
          method: 'PUT',
          mode:"CROS",
          body: JSON.stringify({
            data:{
              value: values,
              poll: this.props.showPoll.data.poll,
              colors: this.props.showPoll.data.colors
            }
          }),
          headers: {
              'Content-Type': 'application/json'
          }
      })

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
      )
        this.props.dispatch(showing("none"));

  }

  handleChange = (e) =>{
    let num = e.target.value;
    const numbers = this.props.showPoll.data.value.slice(0, this.props.showPoll.data.value.length);
    numbers[num] +=1;
    this.setState({valForSub: numbers})

  }
  addOption= () =>{
    this.props.dispatch(addOption(uuidv4()))
  }
  changeOption = (e, id) =>{
    var value= e.target.value;
    this.props.dispatch(editOption(value ,id))
  }
  RandomColor (){
   var letters = '0123456789ABCDEF';
   var color = '#';
   for (var i = 0; i < 6; i++ ) {
       color += letters[Math.floor(Math.random() * 16)];
   }
   return color;
}
  handleAddOption = () =>{

    const option = this.props.pollOptions[0][0].values
    const options = this.props.showPoll.data.poll
    const value = 0
    const values = this.props.showPoll.data.value
    const color = this.RandomColor();
    const colors = this.props.showPoll.data.colors
    if(option){
      var newColors = colors.concat(color)
      var newOptions = options.concat(option)
      var newValues = values.concat(value)
      var show = {
        id: this.props.showPoll.id,
        name: this.props.showPoll.name,
        desc: this.props.showPoll.desc,
        data:{
          value: newValues,
          poll: newOptions,
          colors: newColors
        }

      }
      console.log(show);
      this.props.dispatch(showPoll(show))
      fetch(`/api/poll/${this.props.showPoll.id}`, {
              method: 'PUT',
              mode:"CROS",
              body: JSON.stringify({
                data:show.data
              }),
              headers: {
                  'Content-Type': 'application/json'
              }
          })
      this.props.dispatch(resetOption())

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
    )


    }else{
      this.props.dispatch(resetOption())
    }

  }
  render(){
    return(
      <div className="formCreate formVote">
        <h1>Vote</h1>
        <div className="form room">
          <div className="vote">
            <div className="header-container headerContainer">
              <h2>{this.props.showPoll.name}</h2>
              <p>{this.props.showPoll.desc}</p>
            </div>
            <div className="plus">
              {
              !this.props.pollOptions[0].length ? <h3 onClick={()=> this.addOption()}>add option <i className="fa fa-plus" aria-hidden="true"></i></h3> :
              (
                this.props.pollOptions[0].map((option, i) => {
                return(
                  <div key={i}>
                  <input className="input" placeholder="options" type="text" onChange={(e) => this.changeOption(e, option.id)} />
                  <i onClick={() => this.handleAddOption()} id="correct" className="fa fa-check" aria-hidden="true"></i>
                  </div>
                )

                })
              )
              }
            </div>

              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <select onClick={this.handleChange} className="form-control vote-area" id="sel1">
                    {this.props.showPoll.data.poll.map(function(data, i){
                      return <option value={i} key={i}>{data}</option>
                    })}
                  </select>
                </div>

                  <button type="submit" className="btn btn-primary">Submit</button>
               </form>
          </div>
        </div>
        <div className="gradient"></div>
        <div className="bottom"></div>
      </div>
    )
  }
}
const store = (store) =>{
  return {
    showPoll: store.showPoll,
    polls: store.polls,
    pollOptions: store.pollOptions

  }
}

Vote = connect(store)(Vote)
export default Vote
