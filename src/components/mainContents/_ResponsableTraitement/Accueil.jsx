import React from 'react' ;
import {  Row, Col ,Container,Card,CardBody,CardHeader
} from "reactstrap";
import MonthFormat from '../../assets/MonthFormat';
// import LineChart from '../../assets/'
import ConfigUrl from '../../assets/ConfigUrl'

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
        fncNonTraite:"Chargement en cours..."
    }

}

async getGlobaleTraitee()
{

var date = new Date();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDate();
var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

var dateDeb=date.getFullYear()+'-'+date.getMonth()+'-'+firstDay
var dateFin=date.getFullYear()+'-'+date.getMonth()+'-'+lastDay

   


    

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

var dateDeb=date.getFullYear()+'-'+date.getMonth()+'-'+firstDay
var dateFin=date.getFullYear()+'-'+date.getMonth()+'-'+lastDay

   


    

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
            <Card className='cardbodyStyle'>
                <CardHeader >Accueil Responsable de traitment</CardHeader>
                <CardBody>
                    <Row style={{ paddingLeft: "2%", marginRight: "10%", overflow: "hidden" }}>
                        <Col lg={{ size: "3" }} style={{ backgroundColor: "#17a2b8", height: "auto" }}>
                            <h2>Nombre Fnc reçue{stars}</h2>
                            <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                            <p style={style_}>{this.state.fncRecu}</p>
                        </Col>
                        <Col lg={{ size: "3", offset: "1" }} style={{ backgroundColor: "#28a745" }}>
                            <h2>Nombre Fnc traitée{stars} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
                            <p style={style_}>{this.state.fncTraite}</p></Col>
                        <Col lg={{ size: "3", offset: "1" }} style={{ backgroundColor: "#FFB31B" }}>
                            <h2>Nombre Fnc non traitée{stars} </h2>
                            <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                            <p style={style_}>{this.state.fncNonTraite}</p>
                        </Col>
                    </Row>
                    <Col>{stars}Statistique globale pour le mois de  {MonthFormat(current_date.getMonth())} </Col>

                </CardBody>
            </Card>
        )

    }
}