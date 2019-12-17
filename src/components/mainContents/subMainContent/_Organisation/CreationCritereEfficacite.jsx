import React, { Component} from 'react';
import { CardBody, Card, CardHeader, //Row, Col 
} from "reactstrap";
import Tableau from '../../tableau/_Organisation/TableauCritere'
import PushLeft  from "../subMainStyle";





  const CreationCritereEfficacite =({ match})  => ( 
    <Card style={PushLeft}>
        <CardHeader>Creation de critère d'efficacité</CardHeader>
        <CardBody>
                  <Tableau match={match}></Tableau>
        </CardBody>
        </Card>


    )
export default CreationCritereEfficacite