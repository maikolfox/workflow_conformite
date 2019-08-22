
import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import {  faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Row,
    Col
} from "reactstrap";

export default class Authorization extends React.Component {

    render() {
        library.add(faBan);

        return (
        <React.Fragment><Row> <Col textAlign='center'><h1><strong>Accès refuser !!! </strong> vous ne disposez pas des droits requis pour consulter cette page </h1> </Col> </Row>
            <br />
            <Row> <Col md={{ size: 12, order: 1, offset: 5 }} >   <FontAwesomeIcon
                icon="ban"
                color="red"
                size="10x"
            /></Col></Row>
        </React.Fragment>)

    }

}