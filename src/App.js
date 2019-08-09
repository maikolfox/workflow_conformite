import React from 'react';
import Home from './components/mainContents/Home';
import ActeurTraitant from './components/mainContents/ActeurTraitant';
import ResponsableTraitement from './components/mainContents/ResponsableTraitement';
import Organisation from './components/mainContents/Organisation';

import NavBarMain from './components/assets/NavbarMain';        
import {
  Route,
  BrowserRouter as Router,
  NavLink,
  Switch, Redirect
} from 'react-router-dom';        
//import { Col, Row, Container } from 'reactstrap';
//import PanelWorkFlow from './components/mainContents/PanelWorkFlow'

class App extends React.Component {
  render() {
    return (<NavBarMain/>);
  }
}
export default App;
