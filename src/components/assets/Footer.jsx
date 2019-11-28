
import React from 'react';
import '../css/main.css';


class Footer extends React.Component {
  render() {
    const style_={ position: "fixed",
            padding: "10px 10px 0px 10px", 
            bottom: 0, 
            width: "100%", 
            /* Height of the footer*/  
            height: "90px", 
            background: "grey",
            backgroundColor:"gray",
            marginTop:'90%'
            }
    return (

      
      // <Navbar className='headerStyle' light expand="md">
      //   <h1 id="navBarText">Bridge BANK GROUP -2019 </h1>
      //   <Nav className="ml-auto" navbar>
      //     <Col md={"auto"}>
      //     Déconnexion
      //     </Col>
      //   </Nav>
      // </Navbar>
      <footer style={style_}>
      <p>Posted by: Hege Refsnes</p>
      <p>Contact information: <a href="mailto:someone@example.com">someone@example.com</a>.</p>
      </footer>
    )
  }
}
export default Footer;