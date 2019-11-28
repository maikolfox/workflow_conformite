
import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {  faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Row,
    Col,Container
} from "reactstrap";
import NavBarMain from '../assets/NavbarMain'


export default class Authorization extends React.Component {

    render() {
        library.add(faBan);

        return (
        <React.Fragment>
            <NavBarMain />
            <Container style={{paddingTop:"15%", overflowX:"hidden",overflowY:"hidden" ,boxShadow: "1px 1px 1px 1px rgba(0, 0, 2, .2)"}}>
            <Row style={{overflowY:"hidden"}}> 
            <Col textAlign='center'>
                 <div style={{ textAlign:'center'}}> <h1><strong>Accès refuser !</strong></h1></div>
                 <div style={{textAlign:'center'}}>
                     <h1>vous ne disposez pas des droits </h1>
                 </div> 
                 <div style={{textAlign:'center'}}>
                     <h1> requis pour consulter cette page</h1>
                 </div> 
                 </Col> 
            </Row>
            <br />
            <Row > 
                <Col md={{ size: 12, order: 1, offset: 5 }} >   <FontAwesomeIcon
                icon="ban"
                color="#d9541e"
                size="10x"/></Col>
            </Row>
            </Container>
        </React.Fragment>)

    }

}