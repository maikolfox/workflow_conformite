import React  from 'react';
import {
    Col, Row, 
    //Container, Jumbotron, 
    ListGroup, ListGroupItem,
    //NavLink //Button, Nav, Input, Form, Modal 
} from 'reactstrap';
import '../../css/main.css';
import '../../css/simple-sidebar.css'
//import PanelWorkFlow from './PanelWorkFlow';
import {
    Route,
   // BrowserRouter as Router,
    NavLink, 
    Link,
    Switch, 
  //  Redirect
} from 'react-router-dom';
import Statistique from '../../mainContents/subMainContent/_Organisation/StatistiqueWorkflow';
import CorrectionRoutage from '../../mainContents/subMainContent/_Organisation/ConsultFncRoutagErrone';
import CreationCritereEvaluation from '../subMainContent/_Organisation/CreationCritereEfficacite';
import EvaluationCritere from '../subMainContent/_Organisation/EvaluationCritere';
import EtatsNonConformite from '../subMainContent/_Organisation/EtatNonConformite';
import NavBarMain from '../../assets/NavbarMain';
const style_={ color: 'black', textDecoration: 'none' }

const activeSt ={ color: '#061c27', textDecoration: 'none' }
var  id=1

const Organisation = ({ match }) => (
    <React.Fragment>
    <NavBarMain/>
        <Row noGutters={true}>
            <Col md="2">
                <ListGroup>
                    <ListGroupItem className="menuHeader" >
                        MENU GENERAL
                    </ListGroupItem>
                    <ListGroupItem exac action /**style={ id===1 ? style_ : activeSt} onClick={e=>{id=1}} **/>
                        <Link   activeClassName="activeNav" to={`${match.url}/accueil`} style={style_} activeStyle={activeSt} >Accueil</Link>
                    </ListGroupItem >
                    <ListGroupItem exact action style={ id===2 ? style_ : activeSt} onClick={e=>{id=2}}>
                        <Link  activeClassName="activeNav" to={`${match.url}/routage_incorrect`} style={style_} activeStyle={activeSt}>Correction de routage</Link>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <Link exact activeClassName="activeNav" to={`${match.url}/creation_critere`} style={style_} activeStyle={activeSt} >Création de critère</Link>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <Link exact activeClassName="activeNav" to={`${match.url}/evaluation_de_critere`} style={style_} activeStyle={activeSt}  >Evaluation de critère</Link>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <Link exact activeClassName="activeNav" to={`${match.url}/statistic_fnc`} style={style_} activeStyle={activeSt}>Statistique</Link>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <Link exact activeClassName="activeNav" to={`${match.url}/historique`} style={style_} activeStyle={activeSt}>Historique</Link>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <Link exact activeClassName="activeNav" to={`${match.url}/etats_fnc`} style={style_} activeStyle={activeSt}>Etats des fiches de non conformité</Link>
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
                    <Route path="/Organisation/etats_fnc" component={EtatsNonConformite} />
                </Switch>
            </Col>
        </Row>
    </React.Fragment>

);

export default Organisation;
