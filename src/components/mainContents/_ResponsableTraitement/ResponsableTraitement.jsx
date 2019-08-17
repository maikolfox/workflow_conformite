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
import ValidationRoutage from '../subMainContent/_ResponsableTraitement/ValidationRoutage';
import DemarrerAnalyse from '../subMainContent/_ResponsableTraitement/DemarrerAnalyse';



const ResponsableTraitement = ({ match }) => (
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
                        <NavLink exact activeClassName="activeNav" to={`${match.url}/validation_routage`} >Validation routage</NavLink>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <NavLink exact activeClassName="activeNav" to={`${match.url}/demarrer_analyse`}>Demarrer une analyse</NavLink>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <NavLink exact activeClassName="activeNav" to="/Organisation/evaluation_de_critere">Consultation des critères d'efficacité</NavLink>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <NavLink exact activeClassName="activeNav" to="/Organisation/statistic_fnc">Cloture des taches        </NavLink>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <NavLink exact activeClassName="activeNav" to="/Organisation/historique">Cloture définitive</NavLink>
                    </ListGroupItem>
                    <ListGroupItem action>
                        <NavLink exact activeClassName="activeNav" to="/Organisation/etats_fnc">Etats des fiches de non conformité</NavLink>
                    </ListGroupItem>
                </ListGroup>
            </Col>
            <div></div>
            <Col md="10">
                <Switch>
                    <Route path="/ResponsableTraitement/validation_routage" component={ValidationRoutage} />
                    <Route path="/ResponsableTraitement/demarrer_analyse" component={DemarrerAnalyse} />
                </Switch>
            </Col>
        </Row>

    </React.Fragment>

);

export default ResponsableTraitement;
