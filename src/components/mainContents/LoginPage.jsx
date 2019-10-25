import React from "react";

import {
    Col,
    Row,
    Container,
    FormGroup, Label,
    Form,
    Input,
    Button,
    Alert ,Media
} from 'reactstrap';
import {Redirect} from 'react-router-dom'
import Auth from '../assets/Auth';
export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            password: "",
            responseMessage: "",
            showAlert: false,
            authenticate:false
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.toggle = this.toggle.bind(this)
    }
    handleLogin = e => {
        e.preventDefault();
        fetch('/ssoNautif/fnc',
            {
                method: 'post',
                headers:
                {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "data": {
                        "username": this.state.login,
                        "password": this.state.password
                    }
                })
            },
        ).then(res => res.json()).then(
            (result) => {
                console.log("------>", result)
                if (!result.data.authenticate) {
                    this.setState({ responseMessage: result.data.message, showAlert: true })
                }
                else{
                    Auth.setLocalStorage(this.state.login,result.data.username);
                    Auth.setProfile(result.data.userprofile);
                    this.setState({ authenticate:true })
                }
            },
            (error) => {
                console.log(error.status);
                alert("Erreur lors de la communication avec le serveur , contacter les administrateurs si le problème persiste");
            });
    }
    toggle() {
        this.setState({
            showAlert: !this.state.showAlert
        });
    }
    render() {
        // marginTop: "20%",
        var styled = {  height: "100%",/*backgroundColor:"gray"*/ backgroundImage:"./image/background.jpg" }
        if (this.state.authenticate  || Auth.getAuth()) {
            return <Redirect to='/workflow-gestion-fnc/home' />
        }else
        return (
/*{/* <img src="./image/background.jpg" alt="Accueil" style={{marginTop :'8px'}} height="100%" width="100%" /> style={{backgroundImage: `url("./image/background.jpg")`}}*/
                <Row style={styled}>
                    <Col classeName="boxImage" style={{backgroundImage: `url("./image/background.jpg")` ,backgroundSize: "100% 100%"}} md={8} sm={12}>
                      <Row>&nbsp;</Row>
                      <Row>&nbsp;</Row>
                      <Row>&nbsp;</Row>
                      <Row><Col md={12} sm={12} style={{color:"white", fontSize:"2.5em", marginLeft:"37%",marginTop:"290px"}}><strong> WORKFLOW DES FICHES <br/>DE NON-CONFORMITES</strong></Col></Row> 
                    {/* <img src="./image/background.jpg" alt="Accueil"  height="100%" width="100%" /> */}
                    </Col>
                    <Col md={4} sm={12} style={{marginTop :'17%'}}>
                        <FormGroup>
                            <FormGroup>
                                <FormGroup>
                                    <Form onSubmit={this.handleLogin}>
                                        <Alert fade={true} isOpen={this.state.showAlert} toggle={this.toggle} color="danger">
                                            <strong >{this.state.responseMessage}</strong>
                                        </Alert>
                                        <Label>Login </Label>
                                        <Input type="text"
                                            required
                                            value={this.state.login} onChange={e => {
                                                this.setState({ login: e.target.value })
                                            }}>
                                        </Input>
                                        <Row>&nbsp;</Row>
                                        <Label>Mot de passe</Label>
                                        <Input type="password" required value={this.state.password}
                                            onChange={e => {
                                                this.setState({ password: e.target.value })
                                            }}>
                                        </Input> <Row>&nbsp;</Row>
                                        <Button color="danger" type="submit">Connexion</Button>
                                    </Form>
                                </FormGroup>
                            </FormGroup>
                        </FormGroup>
                    </Col>
                </Row>
        )
    }
}