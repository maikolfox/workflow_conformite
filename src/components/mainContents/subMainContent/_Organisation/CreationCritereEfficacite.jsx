import React, { Component} from 'react';
import { CardBody, Card, CardHeader, //Row, Col 
} from "reactstrap";
import Tableau from '../../tableau/_Organisation/TableauCritere'

var pushLeft={

  marginLeft:'30px'


}



  const CreationCritereEfficacite =({ match})  => ( 
    <Card style={pushLeft}>

        <CardHeader>Creation de critère d'efficacité</CardHeader>
        <CardBody>
                  <Tableau match={match}></Tableau>
        </CardBody>
        </Card>


    )
export default CreationCritereEfficacite