import React from 'react';
import { CardBody, Card, CardHeader, } from "reactstrap";
import Tableau from '../../tableau/_ResponsableTraitement/TableauSuiviDesPlanDaction';
import PushLeft  from "../subMainStyle";



const SuiviAction =({ match})  => (
   <Card style={PushLeft}>
        <CardHeader>Suivi des plans actions </CardHeader>
        <CardBody>
                    <Tableau match={match}></Tableau>
        </CardBody>
      </Card>
);
export default SuiviAction