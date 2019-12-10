import React  from 'react';
// import ValidationRoutage from '../subMainContent/_ResponsableTraitement/ValidationRoutage';
import DemarrerAnalyse from '../subMainContent/_ResponsableTraitement/DemarrerAnalyse';
import NavBarMain from '../../assets/NavbarMain';
import SideBar,{SwitchRoute} from '../../assets/SideBar';
//import ReceptionAction from '../subMainContent/_ResponsableTraitement/ReceptionAction';
import Accueil from './Accueil';

const menuObjet=
[
    {
        url:'Accueil',
        libelle:"Accueil",
        component:Accueil
    },
    {
        url:'demarrer_analyse',
        libelle:'Demarrer une analyse',
        component:DemarrerAnalyse
    },
  
]
//BECAUSE WE WANT TAKE CARE OF PARAM URL DURING SWITCHING ROUTES
const menuObjetSwitch=
[
    {
        url:'Accueil',
        libelle:"Accueil",
        component:Accueil
    },
    {
        url:'demarrer_analyse',
        libelle:'Demarrer une analyse',
        component:DemarrerAnalyse
    },
    {
        url:'demarrer_analyse/:idFnc',
        libelle:'Demarrer une analyse',
        component:DemarrerAnalyse
    },
]
const ResponsableTraitement = ({ match }) => (
    <React.Fragment>
        <NavBarMain/>
        <SideBar match={match} menuItem={menuObjet} menuName="Menu Responsable de traitement"></SideBar>
         <SwitchRoute basePath="ResponsableTraitement" menuItem={menuObjetSwitch} ></SwitchRoute>
    </React.Fragment>
);

export default ResponsableTraitement;
