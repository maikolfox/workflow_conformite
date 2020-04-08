
import React from "react";
import {
    Col,
    Row,
    Media,
    Input,Label
} from "reactstrap";



 export default class MediaAsset extends React.Component {
    render() {
        console.log(typeof  this.props.content);
        const criterBlock =<div style={
            {
            height:"auto",
            overflowY:"scroll",
            backgroundColor : '#e9ecef', 
            border:".1rem #ced4da", 
            borderRadius:".3rem",
            borderTopRightRadius:".3rem" }
        }>{(this.props.content === null || this.props.content === undefined ) ? ""  : this.props.content} </div>
        const value = (typeof this.props.content==="string" && this.props.content!==null) 
        ? 
        <Input type={this.props.content.length>550 ? "textarea":"text"} value={(this.props.content === null || this.props.content === undefined ) ? "" : this.props.content} disabled/> 
        : this.props.content==null ? <Input type={"text"} value= "R.A.S"  disabled/> : criterBlock
        return (
            <React.Fragment>
                <Col style={{height:"auto"}} md={{ size: 12, order: 2, offset: 0 }}>
                    <Media>
                        <Media body style={{textAlign:"justify",height:"20%"}}>
                            <Label>{this.props.libelle}</Label>
                            {value}
                        </Media>
                    </Media>
                </Col>
                <Row>&nbsp;</Row>
            </React.Fragment>
        )
    }
}

class MediaAsset_subContent extends React.Component
{
    render(){
    return (
        <React.Fragment>
            <Col md={{ size: 12, order: 1 }}>
                <Media>
                    <Media body style={{textAlign:"justify"}}>
                        <h5>{this.props.libelle}</h5>
                        {this.props.content}
                     </Media>
                </Media>
            </Col>
            <Row>&nbsp;</Row>
        </React.Fragment>
    )

   }
}

export { MediaAsset_subContent}