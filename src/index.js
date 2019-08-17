import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './components/mainContents/Home';
import ActeurTraitant from './components/mainContents/ActeurTraitant';
import ResponsableTraitement from './components/mainContents/_ResponsableTraitement/ResponsableTraitement';
import Organisation from './components/mainContents/_Organisation/Organisation';

import {
    Route,
    BrowserRouter as Router,
    NavLink,
    Switch, Redirect
  } from 'react-router-dom';
  import {
    NavItem,
    Navbar, NavbarBrand, Nav,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
    // CardHeader,
    // CardBody,
    // Card
  }
    from "reactstrap";
const routing = (
    <Router>
       <App />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/ActeurTraitant" component={ActeurTraitant} />
            <Route path="/ResponsableTraitement" component={ResponsableTraitement} />
            <Route path="/Organisation" component={Organisation} />
          </Switch>
    </Router>)




ReactDOM.render(routing , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
