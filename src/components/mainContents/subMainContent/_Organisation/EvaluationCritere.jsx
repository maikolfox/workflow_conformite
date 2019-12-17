import React, { Component } from 'react';
import { CardBody, Card, CardHeader, 
//  Row, Col 
} from "reactstrap";
import Tableau from '../../tableau/_Organisation/TableauEvaluationCritere'
import PushLeft ,{BoxingCart} from "../subMainStyle";




    const EvaluationCritere =({ match})  => (      
    <Card style={PushLeft}>
        <CardHeader>Evaluation des critères d'efficacité</CardHeader>
        <CardBody>
                <Tableau match={match} ></Tableau>
        </CardBody>
      </Card>
    )


export default EvaluationCritere