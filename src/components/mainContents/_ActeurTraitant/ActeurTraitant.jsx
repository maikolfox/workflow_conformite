import React,{useState} from 'react';
import NavBarMain from '../../assets/NavbarMain';
import ConsultationActAff from '../../mainContents/subMainContent/_ActeurTraitant/ConsultationActAff';
import SideBar,{SwitchRoute} from '../../assets/SideBar';
import Accueil from './Accueil';
import {NavbarToggler,Col,Row} from "reactstrap"

const menuObjet=
[
    {
        url:'Accueil',
        libelle:"Accueil",
        component:Accueil
    },
    {
        url:'reception_action_affecte',
        libelle:"Reception des actions affectées",
        component:ConsultationActAff
    },
]

const ActeurTraitant = ({ match }) => 
{
    const [collapsed, setCollapsed] = useState(true);
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
    <SwitchRoute classMain={collapsed} basePath="ActeurTraitant" menuItem={menuObjet} ></SwitchRoute>
     </>
    )

}
else
    return (
    <React.Fragment>
        <NavBarMain/>
         <SideBar tg={Tog} collapsed={collapsed} match={match} menuItem={menuObjet} menuName="Menu Acteur traitant"></SideBar>
         <SwitchRoute classMain={collapsed} basePath="ActeurTraitant" menuItem={menuObjet} ></SwitchRoute>
    </React.Fragment>)
};

export default ActeurTraitant;
