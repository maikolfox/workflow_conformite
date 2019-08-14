import React, { Component } from 'react';
import { CardBody, Card, CardHeader, Row, Col } from "reactstrap";
import Tableau from '../../tableau/_Organisation/TableauCorrection'


var pushLeft={

  marginLeft:'30px'


}
class ConsultFncRoutageErrone extends Component {

  render() {
    return (
      <Card style={pushLeft}>
        <CardHeader>FNC routage erroné</CardHeader>
        <CardBody>
                    <Tableau></Tableau>
                    
        </CardBody>
      </Card>

    )
  }
}
export default ConsultFncRoutageErrone