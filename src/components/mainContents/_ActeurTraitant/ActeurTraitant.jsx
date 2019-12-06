import React from 'react';
import NavBarMain from '../../assets/NavbarMain';
import ConsultationActAff from '../../mainContents/subMainContent/_ActeurTraitant/ConsultationActAff';
import SideBar,{SwitchRoute} from '../../assets/SideBar';

// import CorrectionRoutage from '../../mainContents/subMainContent/_Organisation/ConsultFncRoutagErrone';
// import CreationCritereEvaluation from '../subMainContent/_Organisation/CreationCritereEfficacite';
// import EvaluationCritere from '../subMainContent/_Organisation/EvaluationCritere';

const Accueil=()=>(<div>hello</div>)

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
(
    <React.Fragment>
        <NavBarMain />
         <SideBar match={match} menuItem={menuObjet} menuName="Menu Acteur traitant"></SideBar>
         <SwitchRoute basePath="ActeurTraitant" menuItem={menuObjet} ></SwitchRoute>

    </React.Fragment>
);

export default ActeurTraitant;
