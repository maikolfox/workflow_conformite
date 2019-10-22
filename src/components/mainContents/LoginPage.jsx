import React from "react";
import Cookies from 'universal-cookie';

import {
    Col,
    Row,
    Container,
    FormGroup, Label,
    Form,
    Input,
    Button,
    Alert 
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
                    Auth.authenticate(this.state.login,result.data.username)
                    localStorage.setItem('username',this.state.login);
                    localStorage.setItem('displayUsername',result.data.username)
                    var date = new Date();
                    date.setTime(date.getTime() + (36000 * 1000));
                    
                    const cookies = new Cookies();
                    cookies.set('userId', this.state.login, { path: '/' ,expires: date});
                    cookies.set('displayName', result.data.username, { path: '/',expires: date });
                    console.log(cookies.get("userId")); // Pacman
                   
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
        var styled = { marginTop: "20%",/*backgroundColor:"gray"*/ }
        const redir=this.state.authenticate
        if (redir === true || Auth.getAuth()) {
            return <Redirect to='/home' />
        }else
        return (
            <Container>
                <Row style={styled}>
                    <Col>
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
            </Container>
        )
    }
}