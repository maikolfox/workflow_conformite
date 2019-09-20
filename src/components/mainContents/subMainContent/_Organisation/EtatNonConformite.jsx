import React, { Component } from 'react';
import { CardBody, Card, CardHeader, 
//  Row, Col 
} from "reactstrap";
import Tableau from '../../tableau/_Organisation/TableauEtatNonConfomite'


var pushLeft={

  marginLeft:'30px'


}
class EtatNonConformite extends Component {

  render() {
    return (
      <Card style={pushLeft}>
        <CardHeader>Etat des non-conformités</CardHeader>
        <CardBody>
                <Tableau></Tableau>
        </CardBody>
      </Card>

    )
  }
}
export default EtatNonConformite