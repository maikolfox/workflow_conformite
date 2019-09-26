import React, { Component } from 'react';
import { Col, Row, Container, Jumbotron, //Button, Nav, Input, Form, Modal 
} from 'reactstrap';

import ModalRensFNC from '../assets/Modal';
//import PanelWorkFlow from './PanelWorkFlow';
var app =require('../../setupProxy')
class Home extends Component {

    // constructor(props){

    //     this.state={


    //     }
    // }
componentDidMount(){
         fetch('/getAuthenticate',
        {
          method: 'GET',
          headers:
          {
            'Content-Type': 'application/json',
          }
        },
        ).then(res => res)
        .then(
        (result) => {
        console.log(result)
        },
        (error) => {
          console.log(error.status);
          alert("Erreur lors de la communication avec le serveur , contacter les administrateurs si le problème persiste");
        });
}
    render() {
        const simpleStyle={textAlign:"justify",fontSize:'120%', color:"#00142C"}

        return (
            <div>
                <Jumbotron fluid >
                    <Container>
                        <h1>WORKFLOW FNC ? </h1>
                        <Row>
                            <Col md="6"><p style={simpleStyle}>
                            A ce jour, le suivi des fiches de non-conformités enregistrées dans le SMQ se fait 
                            manuellement. En raison du volume des informations traitées, cela demande un temps 
                            important de mise à jour des informations, de relances des acteurs traitants et de 
                            production des statistiques relatives à l’évolution des traitements. A cela s’ajoute 
                            le risque élevé d’erreur ou de perte des données dus au traitement manuel de l’information. 
                            La nécessité d’automatiser le suivi du traitement de ces fiches de Non-conformités 
                            s’est alors présentée.
                            </p>
                            <p style={simpleStyle}>
                                l'application <strong>"WORKFLOW FNC"</strong> a pour principaux objectifs :
                                <ul>
                                    <li>La facilitation de l’enregistrement</li>
                                    <li>Le traitement</li>
                                    <li>Le suivi</li>    
                                </ul>   
                             des fiches de non-conformités 
                            </p>
                            </Col>
                            <Col md="6"><img src="./image/VISUELS-VALEURS-PROFESSSIONNALISME.png" alt="Accueil" style={{marginTop :'8px'}} height="100%" width="100%" />
 </Col>
                        </Row>
                        <Row>&nbsp;</Row>
                        <Row >
                            <Col md="12">
                                <ModalRensFNC buttonLabel="Déclarer une non-conformité"></ModalRensFNC>
                            </Col>
                        </Row>
                    </Container>

                </Jumbotron>
            </div>
        )
    }



}
export default Home;