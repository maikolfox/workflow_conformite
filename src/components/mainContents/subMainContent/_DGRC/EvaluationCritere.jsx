import React, { Component } from 'react';
import { CardBody, Card, CardHeader, 
//  Row, Col 
} from "reactstrap";
import Tableau from '../../tableau/_DGRC/TableauEvaluationCritere'

var pushLeft={

  marginLeft:'30px'


}
class EvaluationCritereDGRC extends Component {

  render() {
    return (
      <Card style={pushLeft}>
        <CardHeader>Evaluation des critères d'efficacité</CardHeader>
        <CardBody>
                <Tableau></Tableau>
        </CardBody>
      </Card>

    )
  }
}
export default EvaluationCritereDGRC