import React, { Component } from 'react';
import { CardBody, Card, CardHeader, 
//  Row, Col 
} from "reactstrap";
import Tableau from '../../tableau/_DGRC/TableauEtatNonConfomite'
import PushLeft  from "../subMainStyle";


class EtatNonConformiteDGRC extends Component {

  render() {
    return (
      <Card style={PushLeft}>
        <CardHeader>Etat des non-conformités</CardHeader>
        <CardBody>
                <Tableau></Tableau>
        </CardBody>
      </Card>

    )
  }
}
export default EtatNonConformiteDGRC