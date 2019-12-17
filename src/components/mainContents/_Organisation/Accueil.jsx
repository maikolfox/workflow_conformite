import React from 'react' ;
import {  Row, Col ,Container,Card,CardBody,CardHeader, Jumbotron
} from "reactstrap";
import MonthFormat from '../../assets/MonthFormat';
// import LineChart from '../../assets/'
import ConfigUrl from '../../assets/ConfigUrl'
import PushLeft  from "../subMainContent/subMainStyle";
import { Bar } from 'react-chartjs-2';


const datasProps = {
  labels: [],
  datasets: [
    {
      data: []
    }
  ]
};

const date_ = new Date();
const lib='FNC reçue par mois ('+ date_.getFullYear()+')'

const chartDataUiParam = {

  label: lib,
  fill: false,
  lineTension: 0.1,
  backgroundColor: 'rgba(23, 162, 184, 0.75)',
  borderColor: '#17a2b8',
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

export default class Accueil extends React.Component 
{

  
constructor(props)
{
    super(props);
    // this.getGlobaleRecu=this.getGlobaleRecu.bind(this)
    this.getStatsGlobale=this.getStatsGlobale.bind(this)
    this.state={
        fncRecu:"Chargement en cours...",
        fncTraite:"Chargement en cours...",
        fncNonTraite:"Chargement en cours...",
        dataToSend: []

    }

}

async getGlobaleTraitee()
{

var date = new Date();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDate();
var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();


var month=parseInt( date.getMonth() )+1;
month=month.toString();
console.log("----------->",month)
var dateDeb=date.getFullYear()+'-'+month+'-'+firstDay
var dateFin=date.getFullYear()+'-'+month+'-'+lastDay

   
         const response = await fetch(ConfigUrl.basePath+'/statistisquefncRecueGlobale/fnc',
      {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            data: {
              "dateDeb": dateDeb,
              "dateFin": dateFin
            }
          }),
      }).then(res => res.json())
      .then(
        (result) => {
           this.setState({
             fncRecu: result.data.response
           });
           

        console.log(result)        
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

    }


async getStatsGlobale()
{

  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDate();
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  
  
  var month=parseInt( date.getMonth() )+1;
  month=month.toString();
  console.log("----------->",month)
  var dateDeb=date.getFullYear()+'-'+month+'-'+firstDay
  var dateFin=date.getFullYear()+'-'+month+'-'+lastDay

   


    

         const response1 = await fetch(ConfigUrl.basePath+'/statistisquefncRecueGlobale/fnc',
      {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            data: {
              "dateDeb": date.getFullYear()+'-01'+'-01',
              "dateFin": dateFin
            }
          }),
      }).then(res => res.json())
      .then(
        (result) => {
           this.setState({
             fncRecu: result.data.response
           });
        console.log(result) 
        console.log("result data login--->",result.data.datas);
           var dataPropsUpdate =
           {
             ...datasProps,
             labels: result.data.libelle,
             datasets: [{
               ...chartDataUiParam,
               data:result.data.datas
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

        const response2 = await fetch(ConfigUrl.basePath+'/statistisquefncTraiteGlobale/fnc',
        {
          method: 'POST',
          headers:
          {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              data: {
                "dateDeb": dateDeb,
                "dateFin": dateFin
              }
            }),
        }).then(res => res.json())
        .then(
          (result) => {
             this.setState({
               fncTraite: result.data.response
             });
          console.log(result)        
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

          const response3 = await fetch(ConfigUrl.basePath+'/statistisquefncNonTraiteGlobale/fnc',
        {
          method: 'POST',
          headers:
          {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            {
              data: {
                "dateDeb": dateDeb,
                "dateFin": dateFin
              }
            }),
        }).then(res => res.json())
        .then(
          (result) => {
             this.setState({
               fncNonTraite: result.data.response
             });
          console.log(result)        
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
    }

    async componentDidMount() {
       this.getStatsGlobale()

    }
        render(){
        const stars=<span style={{color:"#d9541e", display:"inline"}}>*</span>
        const style_={color:"white",fontSize:"2em" , textShadow: "1px 1px 1px #333" }


const current_date = new Date()
        return(
            <Card style={PushLeft}>
                <CardHeader >Accueil Organisation</CardHeader>
                <CardBody>
                    <Row style={{ paddingLeft: "2%", marginRight: "10%", overflow: "hidden" }}>
                        <Col lg={{ size: "3" }} style={{ backgroundColor: "#17a2b8", height: "auto" }}>
                            <h2>Nombre Fnc reçue {stars}</h2>
                            <p style={style_}>{this.state.fncRecu}</p>
                        </Col>
                        <Col lg={{ size: "3", offset: "1" }} style={{ backgroundColor: "#28a745" }}>
                            <h2>Nombre Fnc traitée{stars} </h2>
                            <p style={style_}>{this.state.fncTraite}</p></Col>
                        <Col lg={{ size: "3", offset: "1" }} style={{ backgroundColor: "#FFB31B" }}>
                            <h2>Nombre Fnc non traitée{stars}</h2>
                            <p style={style_}>{this.state.fncNonTraite}</p>
                        </Col>
                    </Row>
                    <Col>{stars}Statistique globale pour le mois de  {MonthFormat(current_date.getMonth())} </Col>
                    <Row>
                        <Col stlyle={{position:""}} lg={{ size: "10"}}>
                        <Bar ef="chart" width={20}
                         height={8} data={this.state.dataToSend} />
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        )

    }
}