import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { FormGroup, Input, Form, Label, Col, FormText, Button ,CustomInput} from "reactstrap";
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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    // this.handleOnChange = this.handleOnChange.bind(this);

  };


  handleDownload = async e => {
    e.preventDefault();

    const generateXSLCharline = await fetch('/service/generateXSLCharline',
      {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            tauxActivite: this.state.responseToPost.taux,
            mois: this.state.responseToPost.mois
          }),
      });
    const body = await generateXSLCharline.text();
    this.setState({ pathChartFile: JSON.parse(body) });




    // fake server request, getting the file url as response
    setTimeout(() => {
      const response = {
        file: 'http://127.0.0.1:8887/ooxml-line-chart.xlsx',
      };
      // server sent the url to the file!
      // now, let's download:
      window.location.href = response.file;
      // you could also do:
      // window.open(response.file);
    }, 100);




  }
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/service/tauxDactivite',
      {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            annee: this.state.annee,
            moisDebut: this.state.moisDebut,
            moisFin: this.state.moisFin
          }),
      });
    const body = await response.text();
    this.setState({ responseToPost: JSON.parse(body) });
    var dataPropsUpdate =
    {
      ...datasProps,
      labels: this.state.responseToPost.mois,
      datasets: [{
        ...chartDataUiParam,
        data: this.state.responseToPost.taux
      }]
    };
    this.setState({ dataToSend: dataPropsUpdate });
    console.log(dataPropsUpdate);
    console.log("to send : " + this.state.dataToSend);

  };
  render() {
    return (
      <React.Fragment>        
        <h2 >stats</h2>
        <CustomInput
          type='select'
          id='exampleCustomCheckbox'
          label='Check this custom checkbox'
        />
        <Line ref="chart" width={30}
          height={6} data={this.state.dataToSend} />
        <Button onClick={this.handleDownload} id="ButtonTelecharger" hidden={!(this.state.mfIsSet && this.state.mdIsSet && this.state.agIsSet && this.state.anIsSet) || (this.state.moisDebut > this.state.moisFin)}
        >Telecharger le diagramme</Button>
      </React.Fragment>
    );
  }
 
  componentDidMount() {
    this.setState.datas = this.refs.chart.chartInstance.data
    // {console.log(this.state.datas)}

  }

  componentDidUpdate() {
    //    return (<Line data={this.state.dataToSend} />);
    //this.setState.datas  = this.refs.chart.chartInstance.data    
  }

}
export default LineChart;