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
        left: "35%",
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
                {/* <Jumbotron  fluid style={styleHeight} > */}
                    {/* <Container style={homeStyle}> */}
                        <h1>WORKFLOW FNC ? </h1>
                             {/* <img src="/image/background.jpg" alt="Proffesionnalisme" style={{marginTop :'8px'}} height="100%" width="100%" /> */}
                            <span style={simpleStyle}>
                            <p >
                                L'application <strong>"WORKFLOW FNC"</strong> a pour principaux objectifs :
                                <ul>
                                    <li>La facilitation de l’enregistrement</li>
                                    <li>Le traitement</li>
                                    <li>Le suivi</li>    
                                </ul>   
                             des fiches de non-conformités  
                            </p>
                            <Row>&nbsp;</Row>
                            <Row >
                            <Col md="12">
                                <ModalButton/>
                            </Col>
                            </Row>
                            </span>         
                    {/* </Container> */}
                {/* </Jumbotron> */}
            </div>
        )
    }

 
}
export default Home;