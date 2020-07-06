import React ,{useState} from 'react';
import Statistique from '../../mainContents/subMainContent/_Organisation/StatistiqueWorkflow';
import CorrectionRoutage from '../../mainContents/subMainContent/_Organisation/ConsultFncRoutagErrone';
import CreationCritereEvaluation from '../subMainContent/_Organisation/CreationCritereEfficacite';
import EvaluationCritere from '../subMainContent/_Organisation/EvaluationCritere';
import EtatsNonConformite from '../subMainContent/_Organisation/EtatNonConformite';
import NavBarMain from '../../assets/NavbarMain';
import SideBar,{SwitchRoute} from '../../assets/SideBar';
import Accueil from './Accueil';
import {Col,Row,NavbarToggler } from 'reactstrap';
const menuObjet=
[
    {
        url:'Accueil',
        libelle:"Accueil",
        component:Accueil
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
        component:Accueil
    },
    {
        url:'routage_incorrect',
        libelle:'Correction du routage',
        component:CorrectionRoutage
    },
    {
        url:'routage_incorrect/:idFnc',
        libelle:"Créer un plan d'action",
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
const Organisation = ({ match }) =>{  const [collapsed, setCollapsed] = useState(true);
const Toogle = () => {
    
    setCollapsed(!collapsed)


};
const Tog=<NavbarToggler onClick={()=>setCollapsed(!collapsed)}   />

if (!collapsed){

return (

<>
<NavBarMain/>
<Col style={{marginLeft:"0",marginTop:"5%" ,color:"red"}}>
    <Row>tog{Tog}</Row>
</Col>
<SwitchRoute classMain={collapsed} basePath="organisation" menuItem={menuObjet} ></SwitchRoute>
 </>
)

}
else
return (
<React.Fragment>
    <NavBarMain/>
     <SideBar tg={Tog} collapsed={collapsed} match={match} menuItem={menuObjet} menuName="Menu organisation"></SideBar>
     <SwitchRoute classMain={collapsed} basePath="organisation" menuItem={menuObjet} ></SwitchRoute>
</React.Fragment>)
}

export default Organisation;
