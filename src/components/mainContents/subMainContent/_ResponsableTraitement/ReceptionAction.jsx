import React, { Component } from 'react';
import { CardBody, Card, CardHeader, 
//  Row, Col 
} from "reactstrap";
import Tableau from '../../tableau/_ResponsableTraitement/TableauReceptionAction';


var pushLeft={

  marginLeft:'30px'


}
class DemarrerAnalyse extends Component {

  render() {
    return (
      <Card style={pushLeft}>
        <CardHeader>Demarrer une analyse</CardHeader>
        <CardBody>
                    <Tableau></Tableau>
        </CardBody>
      </Card>

    )
  }
}
export default DemarrerAnalyse