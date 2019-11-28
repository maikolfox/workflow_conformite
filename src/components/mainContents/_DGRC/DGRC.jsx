import React,{Suspense}  from 'react';
import {
    Col, Row, 
    //Container, Jumbotron, 
    ListGroup, ListGroupItem,
    //NavLink //Button, Nav, Input, Form, Modal 
} from 'reactstrap';
import '../../css/main.css';
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
import SideBar,{SwitchRoute} from '../../assets/SideBar';

const Acceuil=()=><h1>Acceuil</h1>
const menuObjet=
[
    {
        url:'Accueil',
        libelle:"Accueil",
        component:Acceuil
    },
    // {
    //     url:'routage_incorrect',
    //     libelle:'Reception des actions affectées',
    //     component:CorrectionRoutage
    // },
    {
        url:'creation_critere',
        libelle:"Création des critères d'évaluation d'efficacité",
        component:CreationCritereEvaluation
    },
    {
        url:'evaluation_de_critere',
        libelle:'Evaluation critere',
        component:EvaluationCritere
    },
    // {
    //     url:'etats_fnc',
    //     libelle:'Etats des FNC',
    //     component:EtatsNonConformite
    // },
    // {
    //     url:'statistic_fnc',
    //     libelle:'Statistique',
    //     component:Statistique
    // }
]

const Dgrc = ({ match }) => (
    <React.Fragment>
    <NavBarMain/>
        <SideBar match={match} menuItem={menuObjet}></SideBar>
         <SwitchRoute basePath="DGRC" menuItem={menuObjet} ></SwitchRoute>
    </React.Fragment>



);







export default Dgrc;
