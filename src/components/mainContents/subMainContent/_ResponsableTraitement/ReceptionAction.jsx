import React, { Component } from 'react';
import { CardBody, Card, CardHeader, 
//  Row, Col 
} from "reactstrap";
import Tableau from '../../tableau/_ResponsableTraitement/TableauReceptionAction';
import PushLeft from "../subMainStyle";



class DemarrerAnalyse extends Component {

  render() {
    return (
      <Card style={PushLeft}>
        <CardHeader>Demarrer une analyse</CardHeader>
        <CardBody>
                    <Tableau></Tableau>
        </CardBody>
      </Card>

    )
  }
}
export default DemarrerAnalyse