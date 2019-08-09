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
import Home from './subMainContent/StatistiqueWorkflow';



const Organisation = ({ match }) => (
    <React.Fragment>

        <Row noGutters="true" >
            <Col md="1">
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
            &nbsp;
            <Col md="10">
                <Switch>
                    <Route path="/Organisation/statistic_fnc" component={Home} />
                    <Route path="/Organisation/ParametreTab" component={Home} />
                    <Route path="/Organisation/ParametreTab" component={Home} />
                    <Route path="/Organisation/ParametreTab" component={Home} />
                </Switch>
            </Col>
        </Row>

    </React.Fragment>

);

export default Organisation;
