import React, { Component } from 'react';

import { FormGroup, Input, Form, Label, Col, FormText, Button,CardBody, Card, CardHeader, Row,Container } from "reactstrap";
import { Line,Bar } from 'react-chartjs-2';
//import BarChart from '../../../mainContents/chartAsset/BarChart';



var boxingChart = {
  border: '1px solid gray', borderRightColor: 'black',
  boxShadow: "1px 3px 1px #9E9E9E"
};

var pushLeft={

  marginLeft:'30px',
  borderColor:"white"


}
const datasProps = {
  labels: [],
  datasets: [
    {
      data: []
    }
  ]
};
const chartDataUiParam = {

  label: 'Non conformité reçue',
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



class Content extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        dateDebStat1:'',
        dateFinStat1:'',
        responseToPost: '',
        dataToSend: [],
        pathChartFile: '',
        isLoaded:false
      }
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleDownload = this.handleDownload.bind(this);
    // this.handleOnChange = this.handleOnChange.bind(this);

  };
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/statistisqueCompteDec/fnc',
      {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
          data:{
              "dateDeb":this.state.dateDebStat1,
              "dateFin":this.state.dateFinStat1
            }
          }),
      }).then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            responseToPost: result,
            hasError: true
          });
                  var dataPropsUpdate =
            {
              ...datasProps,
              labels: this.state.responseToPost.data.libelle,
              datasets: [{
                ...chartDataUiParam,
                data: this.state.responseToPost.data.datas
              }]
            };
            this.setState({ dataToSend: dataPropsUpdate });
        },
        (error) => {
          console.log("124", error.message);
          alert("Erreur lors de la communication avec le serveur , contacter les administrateurs si le problème persiste");
          this.setState({
            isLoaded: true,
            responseToPost:[],
            dataToSend:[],
            hasError: true
          });
        }); 
   
    
  };

  render() {

    return (
      <Card style={pushLeft}>
        <CardHeader>Statistique Workflow</CardHeader>
        <CardBody>
          <Container >
          <Form onSubmit={this.handleSubmit}>
          <FormGroup row>
            <Label for="exampleEmail" md={4}>Axe d'analyse :</Label>
            <Col md={{ size: 4, order: 1, offset: -1 }}>
               <Input 
                type="select"
                id="selectAgence"
                name="selectbasic"
                onChange={e => {console.log(e.target.value)}
                }>
              </Input>
              <FormText >Selectionner un axe d'analyse</FormText>
            </Col>
            <Label for="exampleEmail3" md={4}>Date debut</Label>
            <Col md={{ size: 4, order: 1, offset: - 1 }}>
              <Input 
                type="date"
                id="selectAgence"
                name="selectbasic"
                value={this.state.dateDebStat1}
                onChange={e => {this.setState({dateDebStat1:e.target.value })}}>
              </Input>
              <FormText >Selectionner un mois valide</FormText>
            </Col>
            <Label for="exampleEmail2" sm={4}>Date fin</Label>
            <Col md={{ size: 4, order: 2, offset: -1 }}>
              <Input 
                type="date"
                name="select"
                id="selectMoisFin"
                value={this.state.dateFinStat1}
                onChange={e => {this.setState({dateFinStat1:e.target.value })}}>
              </Input>
              <FormText >Selectionner un mois valide</FormText>
            </Col>
          </FormGroup>
          <Row>&nbsp;</Row>            
          <Button id="ButtonValider">Valider</Button>
        </Form>
        <Bar ref="chart" width={8} height={3} data={this.state.dataToSend}/>   
        </Container>          
      </CardBody>
    </Card>)}


}
export default Content