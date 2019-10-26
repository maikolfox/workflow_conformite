
import React from "react";
import {
    Col,
    Row,
    Media,
    Input,Label
} from "reactstrap";



 export default class MediaAsset extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Col md={{ size: 12, order: 1, offset: -1 }}>
                    <Media>
                        <Media body style={{textAlign:"justify"}}>
                            <Label>{this.props.libelle}</Label>
                            <Input type="textarea" value={this.props.content} disabled></Input>
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