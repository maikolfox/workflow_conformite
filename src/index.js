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
import Authorization_401 from './components/mainContents/Authorization_401';
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
  Container
  // CardHeader, // CardBody, // Card
  }
    from "reactstrap";

 ///PRENDRE EN COMPTE LA REDIRECTION SELON LES AUTORISATIONS
const PrivateRoute = ({ component: Component, ...rest }) => (
   <Route
      {...rest}
      render={props =>
         Auth.getAuth() ? 
         (
            <Component {...props} />
         ) : (
               <Redirect
                  to={{
                     pathname: "/workflow-gestion-fnc/login"
                  }}
               />
            )
      }
   />
);

const RespRoute = ({ component: Component, ...rest }) => (
   <Route
      {...rest}
      render={props =>
         Auth.getAuth() ? 
         Auth.getAuthResp(Auth.getProfileTab()) ? 
         (
            <Component {...props} />
         ) : (
            <Authorization_401/>
            ): (
               <Redirect
                  to={{
                     pathname: "/workflow-gestion-fnc/login"
                  }}
               />
            )
      }
   />
);


const OrgaRoute = ({ component: Component, ...rest }) => (
   <Route
      {...rest}
      render={props =>
         Auth.getAuth() ? 
         Auth.getAuthOrga(Auth.getProfileTab()) ? 
         (
            <Component {...props} />
         ) : (
            <Authorization_401/>
            ): (
               <Redirect
                  to={{
                     pathname: "/workflow-gestion-fnc/login"
                  }}
               />
            )
      }
   />
);

const DGRCRoute = ({ component: Component, ...rest }) => (
   <Route
      {...rest}
      render={props =>
         Auth.getAuth() ? 
         Auth.getAuthDGRC(Auth.getProfileTab()) ? 
         (
            <Component {...props} />
         ) : (
            <Authorization_401/>
            ): (
               <Redirect
                  to={{
                     pathname: "/workflow-gestion-fnc/login"
                  }}
               />
            )
      }
   />
);


const NoMatchPage = () => { return (
   <React.Fragment>
    <NavBarMain/>
      <Container>
         <Col style={{ marginTop: "25%", marginLeft: "25%" }}>
            <h2>LA PAGE QUE VOUS CHERCHEZ N'EXISTE PAS !</h2>
         </Col>
      </Container>
   </React.Fragment>)}

// const RepsonsableTrai= Auth.getAuthResp(Auth.getProfileTab()) ? ResponsableTraitement  :Authorization_401
// const componentResp=()=>{return(RepsonsableTrai)}
class Routing extends React.Component {
   
   
   render(){    


       return( <Router >
            <Switch>
              <Route exact path="/" render={() => 
              (
              Auth.getAuth() ? (
                 <Redirect to="/workflow-gestion-fnc/home"/>
              ) : (
                 <Redirect to="/workflow-gestion-fnc/login"/>
              )
              )}/>
               <Route exact path="/workflow-gestion-fnc" render={() => 
              (
              Auth.getAuth() ? (
                 <Redirect to="/workflow-gestion-fnc/home"/>
              ) : (
                 <Redirect to="/workflow-gestion-fnc/login"/>
              )
              )}/>
              <PrivateRoute exact path="/workflow-gestion-fnc/home" component={Home} />
              <PrivateRoute path="/workflow-gestion-fnc/ActeurTraitant" component={ActeurTraitant} />
              <RespRoute path="/workflow-gestion-fnc/ResponsableTraitement" component={ ResponsableTraitement} />
              <OrgaRoute path="/workflow-gestion-fnc/Organisation" component={Organisation } />
              <DGRCRoute path="/workflow-gestion-fnc/DGRC" component={DGRC} />
              <Route path="/workflow-gestion-fnc/login"  component={LoginPage}/>
              <Route component={NoMatchPage} />
            </Switch>
            {/* <Footer/> */}
      </Router>)
    
   }

}

ReactDOM.render(<Routing/> , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
