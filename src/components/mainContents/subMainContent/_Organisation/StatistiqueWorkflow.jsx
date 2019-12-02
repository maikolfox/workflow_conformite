import React, { Component } from 'react';

import { FormGroup, Input, Form, Label, Col, FormText, Button, CardBody, Card, CardHeader, Row, 
  //Container 
} from "reactstrap";
import { 
  //Line, 
  Bar, 
  Pie 
} from 'react-chartjs-2';
import Processus from '../../../assets/Processus';
import Source from '../../../assets/Source';
import { LoaderV2 } from '../../../assets/Loader';
import displayNomPrenom from '../../../assets/displayNomPrenom';
//import { TabPanel } from '../../tableau/_Organisation/TabSwitcher/TabSwitcher';
//import BarChart from '../../../mainContents/chartAsset/BarChart';





var boxingChart = {
  border: '1px solid gray', borderRightColor: 'black',
  boxShadow: "1px 3px 1px #9E9E9E",
  marginTop: "1%",
  marginLeft: "1%",
  paddingBottom:"20px"
};
var boxingChart2 = {
  border: '1px solid gray', borderRightColor: 'black',
  boxShadow: "1px 3px 1px #9E9E9E",
  marginTop: "1%",
  marginLeft: "0%"
};
var boxingChart3 = {
  border: '1px solid gray', borderRightColor: 'black',
  boxShadow: "1px 3px 1px #9E9E9E",
  marginTop: "1%",
  marginLeft: "1%"
};

var pushLeft = {

  marginLeft: '30px'


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

  label: 'Non-conformité reçue',
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

var multipleBarChart = {
  datasets: [
    {
      label: 'Non-conformités reçues',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(5, 183, 247,0.4)',
      borderColor: 'rgba(0,0,0,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(5, 183, 247,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
    },
    {
      label: 'Non-conformités traitées',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(0,0,0,1)',
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
    },
    {
      label: 'Non-conformité échue non traitées',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(237, 5, 43,0.6)',
      borderColor: 'rgba(0,0,0,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgbargba(171, 2, 2,0.4,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
    },
    {
      label: 'Non-conformité traitées dans les delais',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(62, 168, 50,0.4)',
      borderColor: 'rgba(0,0,0,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(171, 2, 2,0.4,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
    }
  ]
}

class Content extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        isIdActeur: false,
        dateDebStat1: '',
        dateFinStat1: '',
        responseToPost: '',
        dataToSend: [],
        dataBarChart: [],
        pathChartFile: '',
        isLoaded: true,
        axe: "",
        labels: ["Non-conformité reçue", "Non-conformité traité dans les délais"],
        labels2: ["Non-conformité reçue", "Non-conformité traité dans les délais"],

        //   datasets:[{  data:[200,400,2850] ,
        // backgroundColor:['red','blue','green']
        //   }],
        //   datasets2:[{  data:[200,400,2850] ,
        //     backgroundColor:['red','blue','green']
        //       }]

        tauxTraitementDelais: [],
        tauxTraitement: []
      }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGetAllStats = this.handleGetAllStats.bind(this);
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
            data: {
              "dateDeb": this.state.dateDebStat1,
              "dateFin": this.state.dateFinStat1
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
            responseToPost: [],
            dataToSend: [],
            hasError: true
          });
        });
  };

  handleGetAllStats = async e => {

    e.preventDefault();
    const idAct = this.state.axe;
    console.log("------------------------------------------->", idAct === "idActeur")
    if (idAct === "idActeur") {
      this.setState({ isIdActeur: true });
    }
    else {
      this.setState({ isIdActeur: false });
    }
    await fetch('/statistisquefncAllStats/fnc',
      {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            data: {
              "dateDeb": this.state.dateDebStat1,
              "dateFin": this.state.dateFinStat1,
              "axe": this.state.axe
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
          console.log(result);
          var tab = [];
          tab.push(this.state.responseToPost.data.dataNbrRecue);
          tab.push(this.state.responseToPost.data.dataNbrTraitee);
          tab.push(this.state.responseToPost.data.dataEchnt);
          tab.push(this.state.responseToPost.data.dataTraiteeDelais);
          var max = tab[0].datas.length;
          var auxInd = 0;
          tab.map((el, index) => {
            if (max <= el.datas.length) {
              max = el.datas.length
              auxInd = index;
            }
          });
          var auxDatPiechart=[]
          var datasetTraitementDelais = {
            data: [this.state.responseToPost.data.sommRecue, this.state.responseToPost.data.sommeTraiteeDelais],
            backgroundColor: ['blue', 'orange']
          }
          auxDatPiechart.push(datasetTraitementDelais);
          this.setState({tauxTraitementDelais:auxDatPiechart});
          auxDatPiechart=[];
          var datasetTraitement = {
            data: [this.state.responseToPost.data.sommRecue, this.state.responseToPost.data.sommeTraite],
            backgroundColor: ['blue', 'green']
          }
          auxDatPiechart.push(datasetTraitement);
          this.setState({tauxTraitement:auxDatPiechart});
          var dataLibelleFormat = [];
          console.log("is loaded------------------------------>", this.state.isIdActeur)
          if (this.state.isIdActeur) {
            console.log("indise")
            tab[auxInd].libelles.map((el, index) => {
              console.log(el)
              dataLibelleFormat[index] = Processus.find(element => element.idProcessus === el).idResponsable;

            })
            const auxDatForm = dataLibelleFormat;
            // eslint-disable-next-line
            auxDatForm.map((el, index) => {
              dataLibelleFormat[index] = displayNomPrenom(el);
              console.log(dataLibelleFormat[index]);
            })
          }
          if (this.state.axe === 'idSource') {
                                     
            // eslint-disable-next-line
            tab[auxInd].libelles.map((el, index) => {
              dataLibelleFormat[index] = Source.find(element => element.idSource === el).libelleSource;

            })
          }
          
          else {
            // eslint-disable-next-line
            tab[auxInd].libelles.map((el, index) => {
              dataLibelleFormat[index] = Processus.find(element => element.idProcessus === el).libelleProcessus;
            })
          }
          multipleBarChart.labels = dataLibelleFormat;
          multipleBarChart.datasets[0].data = this.state.responseToPost.data.dataNbrRecue.datas;
          multipleBarChart.datasets[1].data = this.state.responseToPost.data.dataNbrTraitee.datas;
          multipleBarChart.datasets[2].data = this.state.responseToPost.data.dataEchnt.datas;
          multipleBarChart.datasets[3].data = this.state.responseToPost.data.dataTraiteeDelais.datas;
          this.setState({ dataToSend: multipleBarChart });
        },
        (error) => {
          console.log("124", error.message);
          alert("Erreur lors de la communication avec le serveur , contacter les administrateurs si le problème persiste");
          this.setState({
            isLoaded: true,
            responseToPost: [],
            dataToSend: [],
            hasError: true
          });
        });
  };

  render() {
    const chartDisplay =
      <React.Fragment>
        <Row>
          <Col style={boxingChart} md={{ size: 11, order: 1, offset: 0 }}>
          {/* <h2>Non</h2> */}
            <strong>Graphique en barres( FNC reçues , traité dans les delais ,traités) </strong>
            <Bar ref="chart" width={8} height={3} data={this.state.dataToSend} />
          </Col>
        </Row>
        <Row>
          <Col style={boxingChart3} md={6}>
          <strong>Taux de traitements des FNC : </strong>
            <Pie ref="chart" width={8} height={3} data={{ labels: this.state.labels2, datasets: this.state.tauxTraitement }} />
          </Col>
          <Col style={boxingChart2} md={5}>
          <p><strong>Taux de traitement des FNC dans les delais :</strong></p>
            <Pie ref="chart" width={9} height={4} data={{ labels: this.state.labels, datasets: this.state.tauxTraitementDelais }} />
          </Col>
        </Row>
      </React.Fragment>
    var response = (this.state.isLoaded) ? chartDisplay : <React.Fragment><Row><LoaderV2></LoaderV2><p style={{ textAlign: "center", marginBottom: "0px", marginTop: "40px" }}>Chargement en cours...</p></Row></React.Fragment>
    return (
      <Card style={pushLeft}>
        <CardHeader>Statistique Workflow</CardHeader>
        <CardBody>
          <Row>
            <Form onSubmit={this.handleGetAllStats}>
              <FormGroup row>
                <Label for="selectbasic" md={3}>Axe d'analyse :</Label>
                <Col md={{ size: 3, order: 1 }}>
                  <Input
                    type="select"
                    name="selectbasic"
                    value={this.state.axe}
                    onChange={e => { this.setState({ axe: e.target.value }) }
                    }>
                    <option default value=""></option>
                    <option value="idSource">Source</option>
                    <option value="idProcessus">Processus</option>
                    <option value="idActeur">Acteur</option>
                  </Input>
                  <FormText >Selectionner un axe d'analyse</FormText>
                </Col>
                <Label for="exampleEmail3" md={3}>Date debut : </Label>
                <Col md={{ size: 3, order: 2 }}>
                  <Input
                    type="date"
                    name="selectbasic"
                    value={this.state.dateDebStat1}
                    onChange={e => { this.setState({ dateDebStat1: e.target.value }) }}>
                  </Input>
                  <FormText >Selectionner un mois valide</FormText>
                </Col>
                <Label for="exampleEmail2" sm={4}>Date fin :</Label>
                <Col md={{ size: 3, order: 3 }}>
                  <Input
                    type="date"
                    name="select"
                    id="selectMoisFin"
                    value={this.state.dateFinStat1}
                    onChange={e => { this.setState({ dateFinStat1: e.target.value }) }}>
                  </Input>
                  <FormText >Selectionner un mois valide</FormText>
                </Col>
                <Col md={{ size: 3, order: 4 }}><Button type="submit" color='danger'>Valider</Button></Col>
              </FormGroup>
              <Row>&nbsp;</Row>
            </Form>
          </Row>
          {response}
        </CardBody>
      </Card>)
  }


}
export default Content