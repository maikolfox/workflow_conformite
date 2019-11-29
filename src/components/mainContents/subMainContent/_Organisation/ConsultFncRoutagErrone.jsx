import React, { Component } from 'react';
import { CardBody, Card, CardHeader,// Row, Col 
} from "reactstrap";
import Tableau from '../../tableau/_Organisation/TableauCorrection'


var pushLeft={

  marginLeft:'30px'


}

  const ConsultFncRoutageErrone =({ match})  => ( 
      <Card style={pushLeft}>
        <CardHeader>FNC routage erroné</CardHeader>
        <CardBody>
                  <Tableau match={match} ></Tableau>
        </CardBody>
      </Card>
  )

export default ConsultFncRoutageErrone