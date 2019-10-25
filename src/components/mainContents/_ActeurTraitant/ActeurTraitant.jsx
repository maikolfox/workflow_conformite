import React  from 'react';
import {
    Col, Row, 
    //Container, Jumbotron, 
    ListGroup, ListGroupItem //Button, Nav, Input, Form, Modal 
} from 'reactstrap';
import '../../css/main.css';
import '../../css/simple-sidebar.css'
//import PanelWorkFlow from './PanelWorkFlow';
import {
    Route,
   // BrowserRouter as Router,
    NavLink, Link,
    Switch, //Redirect
} from 'react-router-dom';

 import ConsultationActAff from '../../mainContents/subMainContent/_ActeurTraitant/ConsultationActAff';
// import CorrectionRoutage from '../../mainContents/subMainContent/_Organisation/ConsultFncRoutagErrone';
// import CreationCritereEvaluation from '../subMainContent/_Organisation/CreationCritereEfficacite';
// import EvaluationCritere from '../subMainContent/_Organisation/EvaluationCritere';
import NavBarMain from '../../assets/NavbarMain';


const Organisation = ({ match }) => (
    <React.Fragment>
        <NavBarMain/>
        <Row noGutters="true" >
            <Col md="2">
                <ListGroup >
                    <ListGroupItem className="menuHeader" >
                        MENU GENERAL
                    </ListGroupItem>
                    <ListGroupItem >
                        <Link exact activeClassName="activeNav" to={`${match.url}/accueil`}>Accueil</Link>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <Link exact activeClassName="activeNav" to={`${match.url}/reception_action_affectee`} >Reception des actions affectées</Link>
                    </ListGroupItem>
                </ListGroup>
                <div id="sidebarMenu">
<ul className="sidebarMenuInner">
<li>Jelena Jovanovic <span>Web Developer</span></li>
<li><a href="https://vanila.io" target="_blank">Company</a></li>
<li><a href="https://instagram.com/plavookac" target="_blank">Instagram</a></li>
<li><a href="https://twitter.com/plavookac" target="_blank">Twitter</a></li>
<li><a href="https://www.youtube.com/channel/UCDfZM0IK6RBgud8HYGFXAJg" target="_blank">YouTube</a></li>
<li><a href="https://www.linkedin.com/in/plavookac/" target="_blank">Linkedin</a></li>
</ul>
</div>
            </Col>

            <div></div>
            
            <Col md="10">
                <Switch>
                   <Route path="/workflow-gestion-fnc/ActeurTraitant/reception_action_affectee" component={ConsultationActAff} /> 
                </Switch>
            </Col>
        </Row>

    </React.Fragment>

);

export default Organisation;
