
import React from "react";
import {
    Col,
    Row,
    Media
} from "reactstrap";



 export default class MediaAsset extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Col md={{ size: 12, order: 1, offset: -1 }}>
                    <Media>
                        <Media body style={{textAlign:"justify"}}>
                            <Media heading>{this.props.libelle}</Media>
                            {this.props.content}
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