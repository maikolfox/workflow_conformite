import React  from 'react';
import DemarrerAnalyse from '../subMainContent/_ResponsableTraitement/DemarrerAnalyse';
import NavBarMain from '../../assets/NavbarMain';
import SideBar,{SwitchRoute} from '../../assets/SideBar';
import SuiviDesAction  from '../subMainContent/_ResponsableTraitement/SuiviDesAction';

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
        libelle:"Créer un plan d'action",
        component:DemarrerAnalyse
    },
    {
        url:'suivi_action',
        libelle:"Suivi des plans d'action",
        component:SuiviDesAction
    }
  
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
        libelle:"Créer un plan d'action",
        component:DemarrerAnalyse
    },
    {
        url:'demarrer_analyse/:idFnc',
        libelle:"Créer un plan d'action",
        component:DemarrerAnalyse
    },
    {
        url:'suivi_action',
        libelle:"Suivit des actions",
        component:SuiviDesAction
    }
    
]
const ResponsableTraitement = ({ match }) => (
    <React.Fragment>
        <NavBarMain/>
        <SideBar match={match} menuItem={menuObjet} menuName="Menu Responsable de traitement"></SideBar>
         <SwitchRoute basePath="ResponsableTraitement" menuItem={menuObjetSwitch} ></SwitchRoute>
    </React.Fragment>
);

export default ResponsableTraitement;
