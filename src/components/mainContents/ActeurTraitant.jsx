import React, { Component } from 'react';
import { Col, Row, Container, Jumbotron, //Button, Nav, Input, Form, Modal 
} from 'reactstrap';

import ModalRensFNC from '../assets/Modal';
//import PanelWorkFlow from './PanelWorkFlow';

class ActeurTraitant extends Component {

    render() {

        return (
            <div>
                <Jumbotron fluid >
                    <Container>
                        <h1>WORKFLOW FNC ? </h1>
                        <Row>
                            <Col md="8">Acteur traitant
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
export default ActeurTraitant;