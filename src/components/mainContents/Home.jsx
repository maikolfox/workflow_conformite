import React, { Component } from 'react';
import { Col, Row, Container, Jumbotron, //Button, Nav, Input, Form, Modal 
} from 'reactstrap';

import ModalRensFNC from '../assets/Modal';
//import PanelWorkFlow from './PanelWorkFlow';

class Home extends Component {

    // constructor(props){

    //     this.state={


    //     }
    // }

    // componentDidMount(){


    //     await fetch('/validationRoutage/fnc',
    //     {
    //       method: 'POST',
    //       headers:
    //       {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         "data":
    //         { //REMPLACER PLUS TARD PAR LA VARIABLE DE SESSION
    //           "idResponsable": "maikol.ahoue@bridgebankgroup.com",
    //           "idFnc":this.state.idFnc,
    //           "statutRoutage":this.state.valRoutage
    //         }
    //       })
    //     }).then(res => res.json())
    //     .then(
    //     (result) => {
    //       console.log(this.state.selected);
    //       this.setState(prevState => ({
    //         responseToPost: prevState.responseToPost.filter(item => {
    //           return item.idFnc !== this.state.idFnc;
    //         })
    //       }))
    //       this.setState({
    //         isLoaded: true,
    //         responseSubmit: result.data.message,
    //         nestedModal:true,
    //       });
    //       console.log(this.state.selected) ;
  
    //     },
    //     (error) => {
    //       console.log("124",error.message);
    //       alert("Erreur lors de la communication avec le serveur , contacter les administrateurs si le problème persiste");
    //       this.setState({
    //         isLoaded: true,
    //         errorMessage:error.message,
    //         hasError:true
    //       });
    //     });
    //   //this.toggleNested();
    //   this.toggle();
    // }

    // }
    render() {
        return (
            <div>
                <Jumbotron fluid >
                    <Container>
                        <h1>WORKFLOW FNC ? </h1>
                        <Row>
                            <Col md="8"><p style={{textAlign:"justify"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur hendrerit molestie arcu non pharetra. 
                            Integer venenatis mi leo, nec faucibus purus dignissim in. Fusce tincidunt maximus lectus, 
                            mattis scelerisque lacus consectetur eu. Aenean augue justo, posuere id tellus in, ultricies tincidunt augue. Nam quis finibus nibh. 
                            Etiam eget vulputate est. Donec rutrum, sapien eu vestibulum aliquet, turpis mi laoreet ipsum, ut mollis ante risus volutpat sapien. 
                            Ut tortor neque, efficitur eget sapien eu, vehicula auctor mi. Vestibulum dictum laoreet vestibulum. Suspendisse potenti.<br /> 
                            All you get is this text and a mostly barebones HTML document.
                            </p></Col>
                        </Row>
                        <Row>&nbsp;</Row>
                        <Row >
                            <Col md="12">
                                <ModalRensFNC buttonLabel="Remplir la fiche de non conformité"></ModalRensFNC>
                            </Col>
                        </Row>
                    </Container>

                </Jumbotron>
            </div>
        )
    }



}
export default Home;