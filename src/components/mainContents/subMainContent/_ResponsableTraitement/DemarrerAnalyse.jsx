import React, { Component } from 'react';
import { CardBody, Card, CardHeader, 
//  Row, Col 
} from "reactstrap";
import Tableau from '../../tableau/_ResponsableTraitement/TableauDemarrageAnalyse';
import PushLeft  from "../subMainStyle";


var pushLeft={

  marginLeft:'30px',
 // boxShadow : "5px 1px 7px #00000059"

}
const DemarrerAnalyse =({ match})  => (
   <Card style={PushLeft}>
        <CardHeader>Demarrer une analyse </CardHeader>
        <CardBody>
                    <Tableau match={match}></Tableau>
        </CardBody>
      </Card>
);
export default DemarrerAnalyse