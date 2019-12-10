import React, { Component } from 'react';
import { CardBody, Card, CardHeader,// Row, Col 
} from "reactstrap";
import Tableau from '../../tableau/_ActeurTraitant/TableauConsultationActAff'


class ConsultationActAff extends Component {

  render() {
    return (
      <Card className="cardbodyStyle">
        <CardHeader>Consultation des actions affectées</CardHeader>
        <CardBody>
                    <Tableau></Tableau>         
        </CardBody>
      </Card>

    )
  }
}
export default ConsultationActAff