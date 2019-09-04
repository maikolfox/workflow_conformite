
import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, UncontrolledDropdown, DropdownItem, DropdownToggle, DropdownMenu ,
  //Col,Row 
} from 'reactstrap';
import {
  //Route,
 // BrowserRouter as Router,
  NavLink,
 // Switch, Redirect
} from 'react-router-dom';
import '../css/main.css';
class NavbarMain extends React.Component {
  render() {
    return (
      <Navbar className='headerStyle' light expand="md">
        <NavbarBrand href="/">
          <img src="./image/logoBridgeBank.png" alt="Accueil" style={{marginTop :'8px'}} height="50%" width="50%" />
        </NavbarBrand>
        <h1 id="navBarText">Workflow FNC</h1>
        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret style={{ color: 'white', fontSize: '20px' }}>
               Menu
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <NavItem>
                  <NavLink style={{ color: 'black', textDecoration: 'none' }} activeStyle={{ color: '#cd511f', textDecoration: 'none' }} to="/Organisation">Espace Organisation</NavLink>
                </NavItem>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <NavItem>
                  <NavLink style={{ color: 'black', textDecoration: 'none' }} activeStyle={{ color: '#cd511f', textDecoration: 'none' }} className="navItemColor" to="/ResponsableTraitement">Espace Responsable de traitement</NavLink>
                </NavItem>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <NavItem>
                  <NavLink style={{ color: 'black', textDecoration: 'none' }} activeStyle={{ color: '#cd511f', textDecoration: 'none' }} className="navItemColor" to="/ActeurTraitant">Espace Acteur traitant </NavLink>
                </NavItem>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </Navbar>
    )
  }
}
export default NavbarMain;