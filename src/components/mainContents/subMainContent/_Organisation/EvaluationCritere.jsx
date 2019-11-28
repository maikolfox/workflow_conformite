import React, { Component } from 'react';
import { CardBody, Card, CardHeader, 
//  Row, Col 
} from "reactstrap";
import Tableau from '../../tableau/_Organisation/TableauEvaluationCritere'

var pushLeft={

  marginLeft:'30px'


}


    const EvaluationCritere =({ match})  => (      
    <Card style={pushLeft}>
        <CardHeader>Evaluation des critères d'efficacité</CardHeader>
        <CardBody>
                <Tableau match={match} ></Tableau>
        </CardBody>
      </Card>
    )


export default EvaluationCritere