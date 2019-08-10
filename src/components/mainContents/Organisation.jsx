import React, { Component } from 'react';
import {
    Col, Row, Container, Jumbotron, ListGroup, ListGroupItem //Button, Nav, Input, Form, Modal 
} from 'reactstrap';
import '../css/main.css';
//import PanelWorkFlow from './PanelWorkFlow';
import {
    Route,
    BrowserRouter as Router,
    NavLink, Link,
    Switch, Redirect
} from 'react-router-dom';
import Statistique from './subMainContent/StatistiqueWorkflow';
import CorrectionRoutage from './subMainContent/ConsultFncRoutagErrone';


const Organisation = ({ match }) => (
    <React.Fragment>

        <Row noGutters="true" >
            <Col md="2">
                <ListGroup >
                    <ListGroupItem className="menuHeader" >
                        MENU GENERAL
          </ListGroupItem>
                    <ListGroupItem >
                        <NavLink exact activeClassName="activeNav" to={`${match.url}/rendering`}>Accueil</NavLink>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <NavLink exact activeClassName="activeNav" to="/Organisation/routage_incorrect" >Correction de routage</NavLink>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <NavLink exact activeClassName="activeNav" to="/Organisation/creation_critere">Création de critère</NavLink>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <NavLink exact activeClassName="activeNav" to="/Organisation/evaluation_de_critere">Evaluation de critère</NavLink>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <NavLink exact activeClassName="activeNav" to="/Organisation/statistic_fnc">Statistique</NavLink>
                    </ListGroupItem>
                </ListGroup>
            </Col>
            <div></div>
            <Col md="10">
                <Switch>
                    <Route path="/Organisation/statistic_fnc" component={Statistique} />
                    <Route path="/Organisation/routage_incorrect" component={CorrectionRoutage} />

                </Switch>
            </Col>
        </Row>

    </React.Fragment>

);

export default Organisation;
