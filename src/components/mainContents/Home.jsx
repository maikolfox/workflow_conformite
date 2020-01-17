import React, { Component } from 'react';
import { Col, Row, Container, Jumbotron, //Button, Nav, Input, Form, Modal 
} from 'reactstrap';
import NavBarMain from '../assets/NavbarMain'
import ModalRensFNC from '../assets/Modal';
import Auth from '../../components/assets/Auth';
import '../css/main.css';
class Home extends Component {

   
    render() {
        const simpleStyle=
        {
        position: "absolute",
        left: "30%",
        top: "10%",
        borderRadius:"10px",
        width: "40%",
        padding:'2%',
        textAlign: "justify",
        color: "#061c27",
        backgroundColor:"white" ,
        
        }
        const homeStyle={   
            overflow:"hidden",
            height:"100%",
            backgroundImage:"url('./image/background.jpg')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            fontSize:"1.95vh"
        }
        const titleStyle={
         textAlign:"center",
         fontWeight: 'bold',
         fontSize:"1.99vh"
        }
        const ModalButton=()=>Auth.getAuthOrga(Auth.getProfileTab()) 
        ?  
            <ModalRensFNC buttonLabel="Déclarer une non-conformité"></ModalRensFNC>  
        : <span/>
        
        return (
            <div style={homeStyle}>
                <NavBarMain />
                            <span style={simpleStyle}>

                            <h3 style={titleStyle} >WORKFLOW GESTION *FNC ?</h3>
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