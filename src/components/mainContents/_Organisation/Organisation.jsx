import React  from 'react';
import {
    Col, Row, 
    //Container, Jumbotron, 
    ListGroup, ListGroupItem,NavLink //Button, Nav, Input, Form, Modal 
} from 'reactstrap';
import '../../css/main.css';
import '../../css/simple-sidebar.css'
//import PanelWorkFlow from './PanelWorkFlow';
import {
    Route,
   // BrowserRouter as Router,
   // NavLink, //Link,
    Switch, 
    Redirect
} from 'react-router-dom';
import Statistique from '../../mainContents/subMainContent/_Organisation/StatistiqueWorkflow';
import CorrectionRoutage from '../../mainContents/subMainContent/_Organisation/ConsultFncRoutagErrone';
import CreationCritereEvaluation from '../subMainContent/_Organisation/CreationCritereEfficacite';
import EvaluationCritere from '../subMainContent/_Organisation/EvaluationCritere';

const style_={ color: 'black', textDecoration: 'none' }

const activeSt ={ color: '#cd511f', textDecoration: 'none' }

const Organisation = ({ match }) => (
    <React.Fragment>

        <Row noGutters="true" >
            <Col md="2">
                <ListGroup >
                    <ListGroupItem className="menuHeader" >
                        MENU GENERAL
                    </ListGroupItem>
                    <ListGroupItem >
                        <NavLink exact action activeClassName="activeNav" href={`${match.url}/accueil`} style={style_} activeStyle={activeSt} >Accueil</NavLink>
                    </ListGroupItem>
                    <ListGroupItem action onClick={e=>{console.log("click")}}>
                        <NavLink exact activeClassName="activeNav" href={`${match.url}/routage_incorrect`} style={style_} activeStyle={activeSt}>Correction de routage</NavLink>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <NavLink exact activeClassName="activeNav" href={`${match.url}/creation_critere`} style={style_} activeStyle={activeSt} >Création de critère</NavLink>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <NavLink exact activeClassName="activeNav" href={`${match.url}/evaluation_de_critere`} style={style_} activeStyle={activeSt}  >Evaluation de critère</NavLink>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <NavLink exact activeClassName="activeNav" href={`${match.url}/statistic_fnc`} style={style_} activeStyle={activeSt}>Statistique</NavLink>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <NavLink exact activeClassName="activeNav" href={`${match.url}/historique`} style={style_} activeStyle={activeSt}>Historique</NavLink>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <NavLink exact activeClassName="activeNav" to={`${match.url}/etats_fnc`} style={style_} activeStyle={activeSt}>Etats des fiches de non conformité</NavLink>
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
