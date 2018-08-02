import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { addName, createName, createDesc, addOption, resetPoll, editOption, deleteOption, resetOption } from '../../actions/index';
import './user.css';
const uuidv4 = require('uuid/v4');



class User extends React.Component {
  constructor(){
    super();
    this.changeName = this.changeName.bind(this);
    this.changeDesc = this.changeDesc.bind(this);
    this.changeOption =this.changeOption.bind(this);
    this.addOption =this.addOption.bind(this);
    this.delOption = this.delOption.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
    this.RandomColor = this.RandomColor.bind(this);
    this.myPolls =this.myPolls.bind(this)
  }
 componentWillMount(){
   !this.props.user.loginStatus ? this.props.history.push("/") : null;
 }
 componentDidMount(){
   if(this.props.user.loginStatus){
     this.props.dispatch(resetPoll())
     fetch(`/api/user/${this.props.user.id}`).then(res => res.json())
     .then(data => this.props.dispatch(addName(data.nickname)))
   }
 }
  RandomColor (){
   var letters = '0123456789ABCDEF';
   var color = '#';
   for (var i = 0; i < 6; i++ ) {
       color += letters[Math.floor(Math.random() * 16)];
   }
   return color;
}
 changeName = (e) =>{
   var name = e.target.value
   this.props.dispatch(createName(name))
 }
 changeDesc = (e) =>{
   var desc = e.target.value
   this.props.dispatch(createDesc(desc))
 }
 changeOption = (e, id) =>{
   var value= e.target.value;
   this.props.dispatch(editOption(value ,id))
 }
 addOption= () =>{
   this.props.dispatch(addOption(uuidv4()))
 }
 delOption = (id) => {
   this.props.dispatch(deleteOption(id))
 }
 myPolls = () =>{
   this.props.history.push(`/poll/${this.props.user.id}`)
 }
 formSubmit = () =>{
   var options = this.props.pollOptions[0].map(option => option.values)
   var filtered = options.filter(option => option !== "")
   var colors = filtered.map(data => this.RandomColor())
   var values = filtered.map(data => 0)
   if(!this.props.createPoll.pollName || !this.props.createPoll.pollDesc || !filtered){
     alert("please fill the data")
   }else{
     var name = this.props.createPoll.pollName,
         desc = this.props.createPoll.pollDesc,
         creator = this.props.user.name
    var data = {
      name: name,
      desc: desc,
      creator:{
        name:creator,
        id:this.props.user.id
      },
      data:{
        poll:filtered,
        value: values,
        colors: colors
      }
    }

    fetch('/api/poll', {
              method: 'POST',
              mode: 'no-cors',
              body: JSON.stringify({
                name:data.name,
                desc: data.desc,
                data:data.data,
                creator:data.creator
              }),
              headers: {
                  'Content-Type': 'application/json'
              }
          })
            this.props.dispatch(resetOption())
            this.props.dispatch(resetPoll())

   }
 }
  render(){
    let color = this.props.user.name.split(" ");
    return (
      <div>
        <div className="p-bar">
          <div  className="p-box">
              <i style={{color:color[1]}} class="fa fa-user" aria-hidden="true"></i>
              <p > {this.props.user.name}</p>
          </div>
          <div className="button active">Make new</div>
          <div onClick={this.myPolls} className="button">My Polls</div>
        </div>
        <div className="formCreate">
          <h1>Create Poll</h1>
          <div className="form">
            <div className="name">
              <div className="header-container">
                <h3>name & description</h3>
              </div>
              <input className="input" placeholder="name" type="text" onChange={(e)=> this.changeName(e)} />
              <input className="input" placeholder="description" type="text" onChange={(e) => this.changeDesc(e)} />
              <button onClick={this.formSubmit} className="submit">Create</button>
            </div>

          <div className="options">
            <div onClick={()=> this.addOption()} className="header-container add">
              <h3>options</h3><i className="fa fa-plus" aria-hidden="true"></i>
            </div>
            {
              (!this.props.pollOptions[0].length) ? (<h1>Add options</h1>) : (
                this.props.pollOptions[0].map((option, i) => {
                return(
                  <div key={i}>
                  <input className="input" placeholder="options" type="text" onChange={(e) => this.changeOption(e, option.id)} />
                  <i onClick={()=> this.delOption(option.id)} className="fa fa-times delete" aria-hidden="true"></i>
                  </div>
                )

                })
              )
            }

          </div>
        </div>
            <div className="gradient">
                <div className="form-chart">
                  <img src="http://icons.iconarchive.com/icons/double-j-design/ravenna-3d/128/Pie-Chart-icon.png" alt=" " />
                </div>
            </div>
            <div className="bottom">

            </div>
        </div>
      </div>
    )
  }
}
const store = (store) =>{
  return {
    user: store.user,
    createPoll: store.createPoll,
    pollOptions: store.pollOptions
  }
}

User = connect(store)(User)

export default User
