import React from "react"

import "../css/main.css"
export default class Loader extends React.Component {
    render() {
        return (
        <div className="lds-css ng-scope" style={{marginLeft:'30%',marginRight:'25%'}}><div style={{width:"100%" ,height:"100%"}} className="lds-flickr"><div></div><div></div><div></div></div>
        </div>)
    }

}