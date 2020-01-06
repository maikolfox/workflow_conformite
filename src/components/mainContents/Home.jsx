import React, { Component } from 'react';
import { Col, Row, Container, Jumbotron, //Button, Nav, Input, Form, Modal 
} from 'reactstrap';
import NavBarMain from '../assets/NavbarMain'
import ModalRensFNC from '../assets/Modal';
import Auth from '../../components/assets/Auth';
class Home extends Component {

   
    render() {
        const simpleStyle=
        {
                position: "absolute",
        left: "30%",
        top: "22%",
        borderRadius:"10px",
        width: "40%",
        padding:'3%',
        textAlign: "justify",
        color: "#fff",
        backgroundColor:"rgba(255,255,255,0.5)" 
        }
        const homeStyle={   
            overflow:"hidden",
            height:"100%",
            backgroundImage:"url('/image/background.jpg')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }
        const ModalButton=()=>Auth.getAuthOrga(Auth.getProfileTab()) 
        ?  
            <ModalRensFNC buttonLabel="Déclarer une non-conformité"></ModalRensFNC>  
        : <span/>
        
        return (
            <div style={homeStyle}>
                <NavBarMain />
                            <span style={simpleStyle}>
                            <h1 style={{textAlign:"center"}} ><strong>WORKFLOW GESTION *FNC ? </strong></h1>
                            <br/>
                            <p >
                                L'application <strong>"WORKFLOW GESTION FNC"</strong> a pour principaux objectifs :
                                <ul>
                                    <li>La facilitation de l’enregistrement</li>
                                    <li>Le traitement</li>
                                    <li>Le suivi</li>    
                                </ul>   
                             des fiches de non-conformités  
                             <br/>
                             <small style={{color:"#fff"}}>* Fiche de Non-Conformité</small>
                            </p>
                            <Row>&nbsp;</Row>
                            <Row >
                            <Col md="12">
                                <ModalButton/>
                            </Col>
                            </Row>
                            </span>         
            </div>
        )
    }

 
}
export default Home;