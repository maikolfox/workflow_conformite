import React, { Component } from 'react';
import { Col, Row, Container, Jumbotron, //Button, Nav, Input, Form, Modal 
} from 'reactstrap';
import NavBarMain from '../assets/NavbarMain'
import ModalRensFNC from '../assets/Modal';
//import PanelWorkFlow from './PanelWorkFlow';
import Auth from '../../components/assets/Auth';
import ConfigUrl from '../assets/ConfigUrl'
var app =require('../../setupProxy')
class Home extends Component {

   
    render() {
        const simpleStyle={textAlign:"justify",fontSize:'120%', color:"#00142C", }
        const styleHeight={height:"100%", marginTop:"2%"}
        const ModalButton=()=>Auth.getAuthOrga(Auth.getProfileTab()) ?  <ModalRensFNC buttonLabel="Déclarer une non-conformité"></ModalRensFNC>  :<span/>
        
        return (
            <div style={{ overflowY:"hidden"}} >
                <NavBarMain />
                <Jumbotron  fluid style={styleHeight} >
                    <Container >
                        <h1>WORKFLOW FNC ? </h1>
                        <Row>
                            <Col md="6"><p style={simpleStyle}>
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
                            <Col md="6"><img src="./image/VISUELS-VALEURS-PROFESSSIONNALISME.png" alt="Proffesionnalisme" style={{marginTop :'8px'}} height="100%" width="100%" /></Col>
                        </Row>
                        <Row>&nbsp;</Row>
                        <Row >
                            <Col md="12">
                                <ModalButton/>
                            </Col>
                        </Row>
                    </Container>

                </Jumbotron>
               
            </div>
        )
    }

 
}
export default Home;