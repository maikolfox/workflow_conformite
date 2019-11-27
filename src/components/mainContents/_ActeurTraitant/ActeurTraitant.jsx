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
import MetisMenu from 'react-metismenu';
import RouterLink from 'react-metismenu-router-link';
import "./sidebar.css"
const content=[
    {
        icon: 'dashboard',
        label: 'Label of Item',
        to: '/workflow-gestion-fnc/ActeurTraitant/reception_action_affectee',
    },
    {
        icon: 'icon-class-name',
        label: 'Second Item',
        content: [
            {
                icon: 'icon-class-name',
                label: 'Sub Menu of Second Item',
                to: '#another-link',
            },
        ],
    },
];
const Organisation = ({ match } ) => (
    <React.Fragment>
        <NavBarMain/> 
        {
        /*<Row style={{marginTop:"100px"}} noGutters="true" >
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
            </Col>
            <div></div>
            <Col md="10">
                <Switch>
                   <Route path="/workflow-gestion-fnc/ActeurTraitant/reception_action_affectee" component={ConsultationActAff} /> 
                </Switch>
            </Col>
        </Row>
        */
        }
<div class="sidenav">
  <a onClick={e=>{alert("click on action")}} href="/workflow-gestion-fnc/ActeurTraitant/reception_action_affectee">Réception des actions affectées</a>
  <a onClick={e=>{alert("click on service")}} href="#services">Services</a>
  <a href="#clients">Clients</a>
  <a href="#contact">Contact</a>
</div>

<div class="main" style={{paddingTop:"100px" ,height:"auto"}}>
    <Switch>
        <Route path="/workflow-gestion-fnc/ActeurTraitant/reception_action_affectee" component={ConsultationActAff} /> 
    </Switch>
</div>
{/* <Row style={{marginTop:"80px" }}>
    <Col md={2}>
        <MetisMenu content={content} />
    </Col>
    <Col md="10">
                <Switch>
                   <Route path="/workflow-gestion-fnc/ActeurTraitant/reception_action_affectee" component={ConsultationActAff} /> 
                </Switch>
            </Col>
</Row> */}
</React.Fragment>

);

export default Organisation;
