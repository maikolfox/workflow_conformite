import React,{useState}  from 'react';

import '../../css/main.css';
//import PanelWorkFlow from './PanelWorkFlow';


// import Statistique from '../../mainContents/subMainContent/_DGRC/StatistiqueWorkflow';
import CreationCritereEvaluation from '../subMainContent/_DGRC/CreationCritereEfficacite';
import EvaluationCritere from '../subMainContent/_DGRC/EvaluationCritere';
// import EtatsNonConformite from '../subMainContent/_DGRC/EtatNonConformite';
import NavBarMain from '../../assets/NavbarMain';
import SideBar,{SwitchRoute} from '../../assets/SideBar';
import {Col,Row, NavbarToggler} from 'reactstrap';

import Accueil from './Accueil';


const menuObjet=
[
    {
        url:'Accueil',
        libelle:"Accueil",
        component:Accueil
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

const Dgrc = ({ match }) => {  const [collapsed, setCollapsed] = useState(true);
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
    <SwitchRoute classMain={collapsed} basePath="DGRC" menuItem={menuObjet} ></SwitchRoute>
     </>
    )
    
    }
    else
    return (
    <React.Fragment>
        <NavBarMain/>
         <SideBar tg={Tog} collapsed={collapsed} match={match} menuItem={menuObjet} menuName="Menu DGRC"></SideBar>
         <SwitchRoute classMain={collapsed} basePath="DGRC" menuItem={menuObjet} ></SwitchRoute>
    </React.Fragment>)
    }






export default Dgrc;
