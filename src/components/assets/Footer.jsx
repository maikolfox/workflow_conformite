
// import React from 'react';
// import '../css/main.css';


// class Footer extends React.Component {
//   render() {
//    const style_={ position: "fixed",
//            padding: "10px 10px 0px 10px", 
//            bottom: 0, 
//            width: "100%", 
//            /* Height of the footer*/  
//            height: "90px", 
//            background: "grey",
//            backgroundColor:"gray",
//            marginTop:'90%'
//            }

    
//     return (

      
//       // <Navbar className='headerStyle' light expand="md">
//       //   <h1 id="navBarText">Bridge BANK GROUP -2019 </h1>
//       //   <Nav className="ml-auto" navbar>
//       //     <Col md={"auto"}>
//       //     Déconnexion
//       //     </Col>
//       //   </Nav>
//       // </Navbar>
//       <div class="footer">
//       <div class="footer-inner">
//           <div class="footer-content">
//               © 2019 <a href="#" target="_blank">Bridge Bank Group</a>, Tous droits réservés.
//           </div>
//       </div>
//   </div>
//     )
//   }
// }
// export default Footer;


import React from 'react';
import { Navbar, Nav
} from 'reactstrap';

class Footer extends React.Component {
  constructor(props){
    super(props)
    this.state={
        displayName:localStorage.getItem('displayUsername')
    }
}
componentDidMount()
{
 
}
  render() {
    var year = new Date();
    year= year.getFullYear();
    return (
      <Navbar fixed={"bottom"} className='footerStyle' light expand="xs" >
        Bridge Bank Group  ©  Tous droits réservés. {year}  
        {/* <h6 id="navBarText">Workflow FNC</h6> */}
        
      </Navbar>
    )
  }
}
export default Footer;