import React, { Component } from 'react'
import { Col, Row, Container, Jumbotron, Button, Nav, Input, Form, Modal } from 'reactstrap'
import NavBarMain from '../assets/NavbarMain';
import ModalRensFNC from '../assets/Modal'
class Home extends Component {

    render() {

        return (
            <div>
                <NavBarMain></NavBarMain>
                <Jumbotron fluid >
                    <Container>
                        <h1>WORKFLOW FNC ? </h1>
                        <Row>
                            <Col md="8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit molestie arcu non pharetra. 
                            Integer venenatis mi leo, nec faucibus purus dignissim in. Fusce tincidunt maximus lectus, 
                            mattis scelerisque lacus consectetur eu. Aenean augue justo, posuere id tellus in, ultricies tincidunt augue. Nam quis finibus nibh. 
                            Etiam eget vulputate est. Donec rutrum, sapien eu vestibulum aliquet, turpis mi laoreet ipsum, ut mollis ante risus volutpat sapien. 
                            Ut tortor neque, efficitur eget sapien eu, vehicula auctor mi. Vestibulum dictum laoreet vestibulum. Suspendisse potenti.<br /> 
                            All you get is this text and a mostly barebones HTML document.
                            
                            </Col>
                        </Row>
                        <Row>&nbsp;</Row>
                        <Row >
                            <Col md="12">
                                <ModalRensFNC buttonLabel="Remplir la fiche de non conformité"></ModalRensFNC>
                            </Col>
                        </Row>
                    </Container>

                </Jumbotron>
            </div>
        )
    }



}
export default Home;