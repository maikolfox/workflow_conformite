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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    // this.handleOnChange = this.handleOnChange.bind(this);

  };


  handleDownload = async e => 
  {
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
    const response = await fetch('/api/statistisqueCompteDec/fnc',
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
      labels: this.state.responseToPost.data.moisDeclaration,
      datasets: [{
        ...chartDataUiParam,
        data: this.state.responseToPost.data.nbrFnc
      }]
    };
    this.setState({ dataToSend: dataPropsUpdate });
    console.log(dataPropsUpdate);
    console.log("to send : " + this.state.dataToSend);

  };
  render() {
    return (
      <React.Fragment>
      {/* <Form onSubmit={this.handleSubmit}>
          <FormGroup row>
            <Label for="exampleEmail" md={4}>Axe d'analyse :</Label>
            <Col md={{ size: 4, order: 1, offset: -1 }}>
              <Input valid={this.state.agIsSet} invalid={!this.state.agIsSet}
                type="select"
                id="selectAgence"
                name="selectbasic"
                value={this.state.agence}
                onChange={e => {
                  this.setState({ agence: e.target.value })
                  if (e.target.value !== "0") {
                    this.setState({ agIsSet: true })
                  }
                  else { this.setState({ agIsSet: false }) }
                }
                }>
                  <option value="0" defaultValue ></option>
                  <option value="siege plateau">Acteur</option>
                  <option value="Nanan Yamousso">Processus</option>
                  <option value="service1">Source</option>
              </Input>
              <FormText hidden={this.state.agIsSet}>Selectionner un axe d'analyse</FormText>
            </Col>
            <Label for="exampleEmail3" md={4}>Mois de debut</Label>
            <Col md={{ size: 4, order: 1, offset: - 1 }}>
              <Input valid={this.state.mdIsSet} invalid={!this.state.mdIsSet}
                type="date"
                id="selectAgence"
                name="selectbasic"
                value={this.state.moisDebut}
                onChange={e => {console.log(e.target.value)}}>
              </Input>
              <FormText hidden={this.state.mdIsSet}>Selectionner un mois valide</FormText>
            </Col>
            <Label for="exampleEmail2" sm={4}>Mois de fin</Label>
            <Col md={{ size: 4, order: 2, offset: -1 }}>
              <Input valid={this.state.mfIsSet} invalid={!this.state.mfIsSet}
                type="date"
                name="select"
                id="selectMoisFin"
                value={this.state.moisFin}
                 onChange={e => {
                //   this.setState({ moisFin: e.target.value })
                //   if (e.target.value !== "0") {
                //     this.setState({ mfIsSet: true })
                //   }
                //   else { this.setState({ mfIsSet: false }) }
                //   let md = this.state.moisDebut;
                //   let mf = e.target.value;
                //   console.log("mf on change");
                //   md = md.split('-');
                //   mf = mf.split('-');
                //   if (parseInt(md[0], 10) > parseInt(mf[0], 10)) {
                //     this.setState({ mdIsSet: false })
                //     console.log("md= " + md[0]);
                //     console.log("md= " + md[0]);
                //     console.log("md > mf mf on change")
                //   }
                //   if ((parseInt(md[0], 10) < parseInt(mf[0], 10)) && (md[0] > 0)) {
                //     this.setState({ mdIsSet: true })
                //     console.log(this.state.moisDebut)
                //     console.log("md= " + md[0]);
                //     console.log("md<mf mf on change")
                //   }

                //   console.log("mf on change end");
                }}>
              </Input>
              <FormText hidden={this.state.mfIsSet}>Selectionner un mois valide</FormText>
            </Col>
          </FormGroup>
          <Button id="ButtonValider" disabled={!(this.state.mfIsSet && this.state.mdIsSet && this.state.agIsSet && this.state.anIsSet) || (this.state.moisDebut > this.state.moisFin)}>Valider</Button>
        </Form> */}
        <Bar ref="chart" width={8}
          height={3} data={this.state.dataToSend} />
        <Button onClick={this.handleDownload} id="ButtonTelecharger" hidden={!(this.state.mfIsSet && this.state.mdIsSet && this.state.agIsSet && this.state.anIsSet) || (this.state.moisDebut > this.state.moisFin)}
        >Telecharger le diagramme</Button>
        </React.Fragment>
    );
  }

  componentDidMount() {
    this.setState.datas = this.refs.chart.chartInstance.data
    // {console.log(this.state.datas)}

  }

  
}
export default LineChart;