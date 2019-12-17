import React, { Component } from 'react';
//import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

import { FormGroup, Input, Form, Label, Col, FormText, Button } from "reactstrap";
import '../../css/main.css'

// constant for get chart data
const datasProps = {
  labels: [],
  datasets: [
    {
      data: []
    }
  ]
};
const chartDataUiParam = {

  label: '',
  fill: false,
  lineTension: 0.1,
  backgroundColor: 'rgba(75,192,192,0.4)',
  borderColor: 'rgba(75,192,192,1)',
  borderCapStyle: 'butt',
  borderDash: [],
  borderDashOffset: 0.0,
  borderJoinStyle: 'miter',
  pointBorderColor: 'rgba(75,192,192,1)',
  pointBackgroundColor: '#fff',
  pointBorderWidth: 1,
  pointHoverRadius: 5,
  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
  pointHoverBorderColor: 'rgba(220,220,220,1)',
  pointHoverBorderWidth: 2,
  pointRadius: 1,
  pointHitRadius: 10,
}

class LineChart extends Component {

  constructor(props) {
    super(props);
    this.state =
      {
        mdIsSet: '',
        mfIsSet: '',
        agIsSet: '',
        anIsSet: '',
        agence: '',
        annee: '',
        moisDebut: '',
        moisFin: '',
        responseToPost: '',
        dataToSend: [],
        pathChartFile: ''
      }
    
  };


 




  
  render() {
    return (
      <React.Fragment>
        <Bar ref="chart" width={8}
          height={3} data={this.state.dataToSend} />
        </React.Fragment>
    );
  }
}
export default LineChart;