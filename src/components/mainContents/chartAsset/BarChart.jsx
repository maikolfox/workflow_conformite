import React from 'react';
import {Bar} from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','Aout','July','Aout','July','Aout','July','Aout','July','Aout','July','Aout','July','Aout','July','Aout'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgb(217,84,30,0.7)',
      borderColor: 'rgba(0,0,0,0)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(23,41,53,1)',
      hoverBorderColor: 'rgba(0,109,132,1)',
      data: [5, 10, 2, 8, 6, 5, 30, 10,15]
    }
  ]
};

export default class BarChart extends React.Component
{
  render() {
    return (
      <div>
        <h2>{this.props.labelBarChart}</h2>
        <Bar
          data={data}
          width={21}
          height={10}
          options={{
            maintainAspectRatio: true
          }}
        />
      </div>
    );
  }
};