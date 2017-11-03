import React from 'react';
import {Pie} from 'react-chartjs-2';
import './poll.css';



class PieChart extends React.Component {

  render() {
    var data = {
     labels: this.props.data.data.poll,

     datasets: [{
       data: this.props.data.data.value,
       backgroundColor: this.props.data.data.colors
     }]
   }
    var options={
     legend: {
       display:false,
   },
 };
    return (<Pie data={data} options={options} />);
  }
}

export default PieChart;
