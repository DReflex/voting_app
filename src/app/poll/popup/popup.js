import React from 'react';
import { render } from 'react-dom';
import './popup.css';
import { connect } from 'react-redux';
import { showing } from '../../../actions/index'
import PopupChart from './popupChart'
import Vote from './vote'

class Popup extends React.Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
}

componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
}
  handleClick = ()=>{
    this.props.dispatch(showing("none"))
  }
  handleKeyPress = (e) => {
      if(e.keyCode === 27){
        this.props.dispatch(showing("none"))
      }
  }
  render(){
    return(
      <div tabIndex="0" onKeyPress={this.handleKeyPress} style={{display: this.props.showPoll.showing}} className="popup">
        <i onClick={this.handleClick} className="fa fa-times" aria-hidden="true"></i>


          <div className="popupContainer">
            <div className="voteContainer">
              <Vote />
            </div>
            <div className="Pie">
              <PopupChart />
            </div>

        </div>
      </div>
    )
  }
}
const store = (store) =>{
  return {
    showPoll: store.showPoll
  }
}

Popup = connect(store)(Popup)
export default Popup
