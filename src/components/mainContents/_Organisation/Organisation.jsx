import React  from 'react';
import {
    Col, Row, Container, Jumbotron, ListGroup, ListGroupItem //Button, Nav, Input, Form, Modal 
} from 'reactstrap';
import '../../css/main.css';
import '../../css/simple-sidebar.css'
//import PanelWorkFlow from './PanelWorkFlow';
import {
    Route,
    BrowserRouter as Router,
    NavLink, Link,
    Switch, Redirect
} from 'react-router-dom';
import Statistique from '../../mainContents/subMainContent/_Organisation/StatistiqueWorkflow';
import CorrectionRoutage from '../../mainContents/subMainContent/_Organisation/ConsultFncRoutagErrone';
import CreationCritereEvaluation from '../subMainContent/_Organisation/CreationCritereEfficacite';
import EvaluationCritere from '../subMainContent/_Organisation/EvaluationCritere';


const Organisation = ({ match }) => (
    <React.Fragment>

        <Row noGutters="true" >
            <Col md="2">
                <ListGroup >
                    <ListGroupItem className="menuHeader" >
                        MENU GENERAL
                    </ListGroupItem>
                    <ListGroupItem >
                        <NavLink exact activeClassName="activeNav" to={`${match.url}/accueil`}>Accueil</NavLink>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <NavLink exact activeClassName="activeNav" to={`${match.url}/routage_incorrect`} >Correction de routage</NavLink>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <NavLink exact activeClassName="activeNav" to={`${match.url}/creation_critere`}>Création de critère</NavLink>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <NavLink exact activeClassName="activeNav" to="/Organisation/evaluation_de_critere">Evaluation de critère</NavLink>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <NavLink exact activeClassName="activeNav" to="/Organisation/statistic_fnc">Statistique</NavLink>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <NavLink exact activeClassName="activeNav" to="/Organisation/historique">Historique</NavLink>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <NavLink exact activeClassName="activeNav" to="/Organisation/etats_fnc">Etats des fiches de non conformité</NavLink>
                    </ListGroupItem>
                </ListGroup>
            </Col>
            <div></div>
            <Col md="10">
                <Switch>
                    <Route path="/Organisation/statistic_fnc" component={Statistique} />
                    <Route path="/Organisation/routage_incorrect" component={CorrectionRoutage} />
                    <Route path="/Organisation/creation_critere" component={CreationCritereEvaluation} />
                    <Route path="/Organisation/evaluation_de_critere" component={EvaluationCritere} />
                </Switch>
            </Col>
        </Row>

    </React.Fragment>

);

export default Organisation;
