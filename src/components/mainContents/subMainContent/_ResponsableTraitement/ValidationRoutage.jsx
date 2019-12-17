import React, { Component } from 'react';
import { CardBody, Card, CardHeader, 
//  Row, Col 
} from "reactstrap";
import Tableau from '../../tableau/_ResponsableTraitement/TableauValidationRoutage';
import PushLeft  from "../subMainStyle";



class ConsultFncRoutageErrone extends Component {

  render() {
    return (
      <Card style={PushLeft}>
        <CardHeader>Validation routage</CardHeader>
        <CardBody>
                    <Tableau></Tableau>
        </CardBody>
      </Card>

    )
  }
}
export default ConsultFncRoutageErrone