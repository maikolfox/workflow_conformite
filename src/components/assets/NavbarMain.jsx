
import React from 'react';
import {Navbar ,NavbarBrand} from 'reactstrap';
import '../css/main.css';
class NavbarMain extends React.Component{
render()
{

return(
<Navbar className='headerStyle'  light expand="md">
          <NavbarBrand href="/">
            <img src="./image/logoBridgeBank.png" alt="BBG" height="75%" width="75%" />
          </NavbarBrand>
              <h1 id="navBarText">Workflow FNC</h1>
        </Navbar>)
        
        }
        
}
export default NavbarMain;