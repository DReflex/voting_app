import React from 'react';
import {Pie} from 'react-chartjs-2';
import './popup.css';
import { connect } from 'react-redux';




class PopupChart extends React.Component {

  render() {
    var data = {
     labels: this.props.showPoll.data.poll,

     datasets: [{
       data: this.props.showPoll.data.value,
       backgroundColor: this.props.showPoll.data.colors
     }]
   }
   var options={
     legend: {
       display:true,
       position:"bottom",
       labels:{
         fontSize: 16,
         boxWidth:25,
         fontColor:'#FFF'
       }
   },
 };
    return (<Pie data={data} options={options} />);
  }
}
const store = (store) =>{
  return {
    showPoll: store.showPoll
  }
}

PopupChart = connect(store)(PopupChart)

export default PopupChart;
