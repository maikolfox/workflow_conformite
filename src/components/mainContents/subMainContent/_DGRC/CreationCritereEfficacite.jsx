import React, { Component} from 'react';
import { CardBody, Card, CardHeader, //Row, Col 
} from "reactstrap";
import Tableau from '../../tableau/_DGRC/TableauCritere'

import PushLeft  from "../subMainStyle";



class CreationCritereEfficaciteDGRC extends Component {

  render() {
    return (
      <Card style={PushLeft}>
        <CardHeader>Creation de critère d'efficacité</CardHeader>
        <CardBody>
                  <Tableau></Tableau>
        </CardBody>
      </Card>
    )
  }
}
export default CreationCritereEfficaciteDGRC