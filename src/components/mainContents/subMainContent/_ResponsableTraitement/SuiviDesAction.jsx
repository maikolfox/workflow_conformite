import React, { Component } from 'react';
import { CardBody, Card, CardHeader, 
//  Row, Col 
} from "reactstrap";
import Tableau from '../../tableau/_ResponsableTraitement/TableauSuiviDesPlanDaction';
import PushLeft  from "../subMainStyle";


var pushLeft={

  marginLeft:'30px',
 // boxShadow : "5px 1px 7px #00000059"

}
const SuiviAction =({ match})  => (
   <Card style={PushLeft}>
        <CardHeader>Suivi des plans actions </CardHeader>
        <CardBody>
                    <Tableau match={match}></Tableau>
        </CardBody>
      </Card>
);
export default SuiviAction