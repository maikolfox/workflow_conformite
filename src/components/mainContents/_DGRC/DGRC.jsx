import React,{Suspense}  from 'react';
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
// import Statistique from '../../mainContents/subMainContent/_DGRC/StatistiqueWorkflow';
import CreationCritereEvaluation from '../subMainContent/_DGRC/CreationCritereEfficacite';
import EvaluationCritere from '../subMainContent/_DGRC/EvaluationCritere';
// import EtatsNonConformite from '../subMainContent/_DGRC/EtatNonConformite';
import NavBarMain from '../../assets/NavbarMain';
const style_={ color: 'black', textDecoration: 'none' }

const activeSt ={ color: '#061c27', textDecoration: 'none' }
var  id=1

const Dgrc = ({ match }) => (
    <React.Fragment>
    <NavBarMain/>
        <Row style={{marginTop:"100px"}} noGutters={true}>
            <Col md="2">
                <ListGroup>
                    <ListGroupItem className="menuHeader" >
                        MENU GENERAL
                    </ListGroupItem>
                    <ListGroupItem exac action /**style={ id===1 ? style_ : activeSt} onClick={e=>{id=1}} **/>
                        <Link   activeClassName="activeNav" to={`${match.url}/accueil`} style={style_} activeStyle={activeSt} >Accueil</Link>
                    </ListGroupItem >
                    <ListGroupItem action>
                        <Link exact activeClassName="activeNav" to={`${match.url}/creation_critere`} style={style_} activeStyle={activeSt} >Création de critère</Link>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <Link exact activeClassName="activeNav" to={`${match.url}/evaluation_de_critere`} style={style_} activeStyle={activeSt}  >Evaluation de critère</Link>
                    </ListGroupItem>
                </ListGroup>
            </Col>
            <div></div>
            <Col md="10">
                <Switch>
                    {/* <Route path="/workflow-gestion-fnc/DGRC/statistic_fnc" component={Statistique} /> */}
                    {/* <Route path="/workflow-gestion-fnc/DGRC/routage_incorrect" component={CorrectionRoutage} /> */}
                    <Route path="/workflow-gestion-fnc/DGRC/creation_critere" component={CreationCritereEvaluation} />
                    <Route path="/workflow-gestion-fnc/DGRC/evaluation_de_critere" component={EvaluationCritere} />
                    {/* <Route path="/workflow-gestion-fnc/DGRC/etats_fnc" component={EtatsNonConformite} /> */}
                </Switch>
            </Col>
        </Row>
    </React.Fragment>

);

export default Dgrc;
