import React, { Component } from 'react';
import { CardBody, Card, CardHeader,// Row, Col 
} from "reactstrap";
import Tableau from '../../tableau/_Organisation/TableauCorrection'
import PushLeft  from "../subMainStyle";




  const ConsultFncRoutageErrone =({ match})  => ( 
      <Card style={PushLeft}>
        <CardHeader>FNC routage erroné</CardHeader>
        <CardBody>
                  <Tableau match={match} ></Tableau>
        </CardBody>
      </Card>
  )

export default ConsultFncRoutageErrone