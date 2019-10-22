
import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, UncontrolledDropdown, DropdownItem, DropdownToggle, DropdownMenu ,
  Col, 
} from 'reactstrap';
import {
  //Route,
 // BrowserRouter as Router,
  Link,
 // Switch, Redirect
} from 'react-router-dom';
import '../css/main.css';
import Auth from "./Auth";
import Cookies from 'universal-cookie';

class NavbarMain extends React.Component {
  constructor(props){
    super(props)
    this.state={
        userId:"",
        displayName:""
    }
}
componentDidMount(){
  const cookies = new Cookies();
  this.setState({displayName:localStorage.getItem('displayName')})
}
  render() {
    const displayName=this.state.displayName;
    return (
      <Navbar className='headerStyle' light expand="md">
        <NavbarBrand href="/home">
          <img src="./image/logoBridgeBank.png" alt="Accueil" style={{marginTop :'8px'}} height="50%" width="50%" />
        </NavbarBrand>
        <h1 id="navBarText">Workflow FNC</h1>
        <Nav className="ml-auto" navbar>
          <Col md={"auto"} style={{color:"#cd511f", fontWeight:"bold",marginRight:"auto",marginTop:"5%" }}>{ displayName}</Col>
          <Col md={"auto"}>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret style={{ color: 'white', fontSize: '20px' }}>
               Menu
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <NavItem>
                  <Link style={{ color: 'black', textDecoration: 'none' }} activeStyle={{ color: '#cd511f', textDecoration: 'none' }} to="/Organisation">Espace Organisation</Link>
                </NavItem>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <NavItem>
                  <Link style={{ color: 'black', textDecoration: 'none' }} activeStyle={{ color: '#cd511f', textDecoration: 'none' }} className="navItemColor" to="/ResponsableTraitement">Espace Responsable de traitement</Link>
                </NavItem>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <NavItem>
                  <Link style={{ color: 'black', textDecoration: 'none' }} activeStyle={{ color: '#cd511f', textDecoration: 'none' }} className="navItemColor" to="/ActeurTraitant" onClick={Auth.remove()}>Espace Acteur traitant </Link>
                </NavItem>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <NavItem>
                  <Link style={{ color: 'black', textDecoration: 'none' }} activeStyle={{ color: '#cd511f', textDecoration: 'none' }} className="navItemColor" to="/login">Deconnexion</Link>
                </NavItem>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          </Col>
        </Nav>
      </Navbar>
    )
  }
}
export default NavbarMain;