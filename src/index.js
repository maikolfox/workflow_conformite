import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './components/mainContents/Home';
import ActeurTraitant from './components/mainContents/_ActeurTraitant/ActeurTraitant';
import ResponsableTraitement from './components/mainContents/_ResponsableTraitement/ResponsableTraitement';
import Organisation from './components/mainContents/_Organisation/Organisation';
import DGRC from './components/mainContents/_DGRC/DGRC';
import LoginPage from './components/mainContents/LoginPage';
import Auth from './components/assets/Auth';
import NavBarMain from './components/assets/NavbarMain';
import Footer from './components/assets/Footer';
import Authorization from './components/mainContents/Authorization_401';

import {
    Route,
    BrowserRouter as Router,
    //NavLink,
    Switch, 
    Redirect
  } 
  from 'react-router-dom';

  

 import {
  Col,
  Container,
  Row,Jumbotron
  // CardHeader, // CardBody, // Card
  }
    from "reactstrap";

 ///PRENDRE EN COMPTE LA REDIRECTION SELON LES AUTORISATIONS
const PrivateRoute = ({ component: Component, ...rest }) => (
   <Route basename={'/workflow-gestion-fnc'}
      {...rest}
      render={props =>
         Auth.getAuth() ? 
         (
            <Component {...props} />
         ) : (
               <Redirect
                  to={{
                     pathname: "/login"
                  }}
               />
            )
      }
   />
);

const RespRoute = ({ component: Component, ...rest }) => (
   <Route basename={'/workflow-gestion-fnc'}
      {...rest}
      render={props =>
         Auth.getAuth() ? 
         Auth.getAuthResp(Auth.getProfileTab()) ? 
         (
            <Component {...props} />
         ) : (
            <Authorization/>
            ): (
               <Redirect
                  to={{
                     pathname: "/login"
                  }}
               />
            )
      }
   />
);


const OrgaRoute = ({ component: Component, ...rest }) => (
   <Route basename={'/workflow-gestion-fnc'}
      {...rest}
      render={props =>
         Auth.getAuth() ? 
         Auth.getAuthOrga(Auth.getProfileTab()) ? 
         (
            <Component {...props} />
         ) : (
            <Authorization/>
            ): (
               <Redirect
                  to={{
                     pathname: "/login"
                  }}
               />
            )
      }
   />
);

const DGRCRoute = ({ component: Component, ...rest }) => (
   <Route basename={'/workflow-gestion-fnc'}
      {...rest}
      render={props =>
         Auth.getAuth() ? 
         Auth.getAuthDGRC(Auth.getProfileTab()) ? 
         (
            <Component {...props} />
         ) : (
            <Authorization/>
            ): (
               <Redirect
                  to={{
                     pathname: "/login"
                  }}
               />
            )
      }
   />
);


const Deconnexion = ({ component: Component, ...rest }) => (
   <Route basename={'/workflow-gestion-fnc'}
      {...rest}
      render={props =>
         Auth.remove() ? 
         (<Redirect
            to={{
               pathname: "/login"
            }}
         />
            
          ) : (
            <Component {...props} />
            )
       }
   />
   
);

const NoMatchPage = () => { return (
   <React.Fragment>
    <NavBarMain/>
      <Container>
         <Col style={{ marginTop: "25%", textAlign:"center" }}>
            <h2>LA PAGE QUE VOUS ESSAYEZ DE CONSULTER N'EXISTE PAS ! </h2>
            <Row>&nbsp;</Row>
            <Row>&nbsp;</Row>
            <Row>&nbsp;</Row>
            <Col style={{  textAlign:"center" }}> <a style={{textDecoration : "none"}} href="/workflow-gestion-fnc/home">Retour à la page d'accueil</a> </Col>
         </Col>
      </Container>
   </React.Fragment>)}

// const RepsonsableTrai= Auth.getAuthResp(Auth.getProfileTab()) ? ResponsableTraitement  :Authorization
// const componentResp=()=>{return(RepsonsableTrai)}

class Routing extends React.Component {
   render(){    
       return( 
      

       <Router basename={'/workflow-gestion-fnc'}>

            <Switch>
              <Route exact path="/" render={() => 
              (
              Auth.getAuth() ? (
                 <Redirect to="/home"/>
              ) : (
                 <Redirect to="/login"/>
              )
              )}/>
             
              <PrivateRoute exact path="/home" component={Home} />
              <PrivateRoute path="/ActeurTraitant" component={ActeurTraitant} />
              <RespRoute path="/ResponsableTraitement" component={ ResponsableTraitement} />
              <OrgaRoute path="/Organisation" component={Organisation } />
              <DGRCRoute path="/DGRC" component={DGRC} />
              <Route exact path="/login"  component={LoginPage}/>
              <Deconnexion path="/deconnexion"  component={LoginPage}/>
              <Route component={NoMatchPage} />
            </Switch>
      </Router>
)
    
   }

}

ReactDOM.render(<Routing/> , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
