import React from 'react';
import Statistique from '../../mainContents/subMainContent/_Organisation/StatistiqueWorkflow';
import CorrectionRoutage from '../../mainContents/subMainContent/_Organisation/ConsultFncRoutagErrone';
import CreationCritereEvaluation from '../subMainContent/_Organisation/CreationCritereEfficacite';
import EvaluationCritere from '../subMainContent/_Organisation/EvaluationCritere';
import EtatsNonConformite from '../subMainContent/_Organisation/EtatNonConformite';
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
    {
        url:'routage_incorrect',
        libelle:'Correction du routage',
        component:CorrectionRoutage
    },
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
    {
        url:'etats_fnc',
        libelle:'Etats des FNC',
        component:EtatsNonConformite
    },
    {
        url:'statistic_fnc',
        libelle:'Statistique',
        component:Statistique
    }
];
const menuObjetSwitchRoute=
[
    {
        url:'Accueil',
        libelle:"Accueil",
        component:Acceuil
    },
    {
        url:'routage_incorrect',
        libelle:'Correction du routage',
        component:CorrectionRoutage
    },
    {
        url:'creation_critere',
        libelle:"Création des critères d'évaluation d'efficacité",
        component:CreationCritereEvaluation
    },
    {
        url:'creation_critere/:idFnc',
        libelle:"Création des critères d'évaluation d'efficacité",
        component:CreationCritereEvaluation
    },
    {
        url:'evaluation_de_critere',
        libelle:'Evaluation critere',
        component:EvaluationCritere
    },
    {
        url:'etats_fnc',
        libelle:'Etats des FNC',
        component:EtatsNonConformite
    },
    {
        url:'statistic_fnc',
        libelle:'Statistique',
        component:Statistique
    }
]
const Organisation = ({ match }) => (
    <React.Fragment>
    <NavBarMain/>
        <SideBar match={match} menuItem={menuObjet}></SideBar>
        <SwitchRoute basePath="Organisation" menuItem={menuObjetSwitchRoute}></SwitchRoute>
    </React.Fragment>
);

export default Organisation;
