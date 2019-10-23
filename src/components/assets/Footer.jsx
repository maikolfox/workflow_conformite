
import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, UncontrolledDropdown, DropdownItem, DropdownToggle, DropdownMenu ,
  Col, 
} from 'reactstrap';

import '../css/main.css';
import Auth from "./Auth";
class Footer extends React.Component {
  render() {
    return (
      <Navbar className='headerStyle' light expand="md">
        <h1 id="navBarText">Bridge BANK GROUP -2019 </h1>
        <Nav className="ml-auto" navbar>
          <Col md={"auto"}>
          Déconnexion
          </Col>
        </Nav>
      </Navbar>
    )
  }
}
export default Footer;