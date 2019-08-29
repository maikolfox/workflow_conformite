import React, { Component } from 'react';
import { CardBody, Card, CardHeader,// Row, Col 
} from "reactstrap";
import Tableau from '../../tableau/_ActeurTraitant/TableauConsultationActAff'


var pushLeft={

  marginLeft:'30px'


}
class ConsultationActAff extends Component {

  render() {
    return (
      <Card style={pushLeft}>
        <CardHeader>Consultation des actions affectées</CardHeader>
        <CardBody>
                    <Tableau></Tableau>
                    
        </CardBody>
      </Card>

    )
  }
}
export default ConsultationActAff