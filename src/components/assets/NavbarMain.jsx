
import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, UncontrolledDropdown, DropdownItem, DropdownToggle, DropdownMenu ,NavbarToggler, NavLink,Collapse,
  Col, Row
} from 'reactstrap';
import {
  //Route,
 // BrowserRouter as Router,
  Link,
 // Switch, Redirect
 history
} from 'react-router-dom';
import '../css/main.css';
import UserIcon from "./UserIcon"
import Auth from "./Auth";
class NavbarMain extends React.Component {
  constructor(props){
    super(props)
    this.state={
        displayName:localStorage.getItem('displayUsername'),
        collapsed:true
      }

  this.toggleNavbar=this.toggleNavbar.bind(this)
  
  }
 toggleNavbar(){
   this.setState(prevState=>({collapsed:!prevState.collapsed}));
 }
componentDidMount()
{
 
}
  render() {
    return (
//       <div>
//       <Navbar fixed={"top"}  className='headerStyle' light expand="md" >
//         <NavbarBrand href="/workflow-gestion-fnc/home">
// <img src={window.location.origin+"/workflow-gestion-fnc/image/logoBridgeBank.png"} alt="BRIDGE BANK" style={{marginTop :'8px'}} height="50%" width="50%" />
//         </NavbarBrand>
//         <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
//         {/* <h6 id="navBarText">Workflow FNC</h6> */}
//         <Collapse isOpen={!this.state.collapsed} navbar>
//         <Nav className="ml-auto" navbar >
//           <Col md={"auto"}>
//           <UncontrolledDropdown nav inNavbar> 
//             <DropdownToggle nav caret style={{color:"#cd511f", fontWeight:"bold",marginRight:"auto",marginTop:"5%" }}>
//              <UserIcon/> {Auth.getDisplayName()}  
//             </DropdownToggle> 
//             <DropdownMenu right>
//               <DropdownItem>
//                 <NavItem>
//                   <Link style={{ color: 'black', textDecoration: 'none' }} activeStyle={{ color: '#cd511f', textDecoration: 'none' }} to="/Organisation">Espace Organisation</Link>
//                 </NavItem>
//               </DropdownItem>
//               <DropdownItem divider />
//               <DropdownItem>
//                 <NavItem>
//                   <Link style={{ color: 'black', textDecoration: 'none' }}  to="/DGRC">Espace DGRC</Link>
//                 </NavItem>
//               </DropdownItem>
//               <DropdownItem divider />
//               <DropdownItem>
//                 <NavItem>
//                   <Link style={{ color: 'black', textDecoration: 'none' }} activeStyle={{ color: '#cd511f', textDecoration: 'none' }} className="navItemColor" to="/ResponsableTraitement">Espace Responsable de traitement</Link>
//                 </NavItem>
//               </DropdownItem>
//               <DropdownItem divider />
//               <DropdownItem>
//                 <NavItem>
//                   <Link style={{ color: 'black', textDecoration: 'none' }} activeStyle={{ color: '#cd511f', textDecoration: 'none' }} className="navItemColor" to="/ActeurTraitant">Espace Acteur traitant </Link>
//                 </NavItem>
//               </DropdownItem>
//               <DropdownItem divider />
//               <DropdownItem>
//               <NavItem>
//                   <Link style={{ color: 'black', textDecoration: 'none' }} activeStyle={{ color: '#cd511f', textDecoration: 'none' }} className="navItemColor" to="/Home">Accueil </Link>
//                 </NavItem>
//               </DropdownItem>
//               <DropdownItem divider />
//               <DropdownItem>
//               <NavItem>
//                   <Link style={{ color: 'red', textDecoration: 'none' }} activeStyle={{ color: '#cd511f', textDecoration: 'none' }} className="navItemColor" to="/deconnexion">Déconnexion </Link>
//                 </NavItem>
//               </DropdownItem>
//             </DropdownMenu>
//           </UncontrolledDropdown>
//           </Col>
//         </Nav>
//         </Collapse>
//       </Navbar>
//       </div>
<header className="main-header">
                <a href="#" className="logo">
                    <span className="logo-mini"><b>A</b>LT</span>
                    <span className="logo-lg"><b>Admin</b>LTE</span>
                </a>
                <nav className="navbar navbar-static-top">
                    <a href="#" className="sidebar-toggle" data-toggle="push-menu" role="button">
                        <span className="sr-only">Toggle navigation</span>
                    </a>
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            <li className="dropdown messages-menu">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="fa fa-envelope-o"></i>
                                    <span className="label label-success">4</span>
                                </a>
                                <ul className="dropdown-menu">
                                    <li className="header">You have 4 messages</li>
                                    <li>
                                        <ul className="menu">
                                            <li>
                                                <a href="#">
                                                    <div className="pull-left">
                                                        <img src="img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                                                    </div>
                                                    <h4>
                                                        Support Team
                                                        <small><i className="fa fa-clock-o"></i> 5 mins</small>
                                                    </h4>
                                                    <p>Why not buy a new awesome theme?</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
    )
  }
}
export default NavbarMain;