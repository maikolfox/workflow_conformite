import React from 'react';
import 
{
    Route,
    // BrowserRouter as Router,
    NavLink,
    Switch, //Redirect
} from 'react-router-dom';
import '../css/main.css';
import "../css/sidebar.css";


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
        <div class="sidenav">
            {Menu}
        </div>

    )
}

//SWITCH ROUTE

export function SwitchRouteItem(props) {
    if (props.url === 'Accueil') {
        return (
            <Switch>
                <Route exact path={`/${props.basePath}/`} component={props.children} />
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
    return (
        <div class="main" style={{ paddingTop: "100px", height: "auto" }}>
            {SwitchRoutes}
        </div>
    )
}