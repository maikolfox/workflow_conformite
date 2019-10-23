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
import LoginPage from './components/mainContents/LoginPage';
import Auth from './components/assets/Auth';
import NavBarMain from './components/assets/NavbarMain';
import Footer from './components/assets/Footer';

import {
    Route,
    BrowserRouter as Router,
    //NavLink,
    Switch, 
    Redirect
  } from 'react-router-dom';
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
         Auth.getAuth() ? (
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

const NoMatchPage = () => { return (<Container>
      <Col style={{ marginTop: "25%", marginLeft: "25%" }}>
            <h2>LA PAGE QUE VOUS CHERCHEZ N'EXISTE PAS !</h2></Col>
      </Container>)}

function Routing() {
       
       return <Router >
            <Switch>
              <Route exact path="/" render={() => (
              Auth.getAuth() ? (
                 <Redirect to="/home"/>
              ) : (
                 <Redirect to="/login"/>
              )
              )}/>
              <PrivateRoute exact path="/home" component={Home} />
              <PrivateRoute path="/ActeurTraitant" component={ActeurTraitant} />
              <PrivateRoute path="/ResponsableTraitement" component={ResponsableTraitement} />
              <PrivateRoute path="/Organisation" component={Organisation} />
              <Route path="/login"  component={LoginPage}/>
              <Route component={NoMatchPage} />
            </Switch>
            {/* <Footer/> */}
      </Router>
    
   }



ReactDOM.render(<Routing/> , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
