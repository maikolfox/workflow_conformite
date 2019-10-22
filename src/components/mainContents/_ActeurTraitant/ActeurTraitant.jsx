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


const Organisation = ({ match }) => (
    <React.Fragment>
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
            </Col>
            <div></div>
            <Col md="10">
                <Switch>
                   <Route path="/ActeurTraitant/reception_action_affectee" component={ConsultationActAff} /> 
                </Switch>
            </Col>
        </Row>

    </React.Fragment>

);

export default Organisation;
