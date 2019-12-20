import React from 'react';
import 
{
    Route,
    NavLink,
    Switch, 
} from 'react-router-dom';
import '../css/main.css';
import "../css/sidebar.css";
 import {Container,Col ,Row} from "reactstrap"

const NoMatchPage = () => { return (
    <React.Fragment>
       <Container>
          <Col style={{ marginTop: "25%", textAlign:"center" }}>
             <h2>LA PAGE QUE VOUS ESSAYEZ DE CONSULTER N'EXISTE PAS ! </h2>
             <Row>&nbsp;</Row>
             <Row>&nbsp;</Row>
             <Row>&nbsp;</Row>
             <Col style={{  textAlign:"center" }}> <a style={{textDecoration : "none"}} href={"/workflow-gestion-fnc/home"}>A l'accueil</a> </Col>
          </Col>
       </Container>
    </React.Fragment>)}

//MENU ITEM 
export function SideBarItem(props) {
    return (
        <NavLink exact activeClassName="activeNav" to={`${props.match.url}/${props.menuItem.url}`}>{props.menuItem.libelle}</NavLink>
    )
}

export default function SideBar(props) {
    const Menu = props.menuItem.map(item => (
        <SideBarItem match={props.match} menuItem={item} />
    ))
    return (
        <div className="sidenav">
            <div className="title">{props.menuName}</div>
            {Menu}
        </div>

    )
}

//SWITCH ROUTE

export function SwitchRouteItem(props) {
    if (props.url === 'Accueil') {
        return (
                <Switch>              
                    <Route exact path={`/${props.basePath}`} component={props.children} />
                    <Route exact path={`/${props.basePath}/${props.url}`} component={props.children} />
                </Switch>
                )
    }
    else
        return (
            <React.Fragment>
                <Switch>
                    <Route exact path={`/${props.basePath}/${props.url}`} component={props.children} />
                </Switch>
            </React.Fragment>
        )
}

export function SwitchRoute(props) {

    const SwitchRoutes = props.menuItem.map(item => (<SwitchRouteItem basePath={props.basePath} url={item.url} children={item.component} />))
   // the route handler for the url which leads to page that not exist
   //SwitchRoute.push(<Route component={NoMatchPage} />)
    return (
        <div class="main" style={{ paddingTop: "100px", height: "auto" }}>
            {SwitchRoutes}
        </div>
    )
}