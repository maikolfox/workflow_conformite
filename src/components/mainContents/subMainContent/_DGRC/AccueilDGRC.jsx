import React, { Component } from 'react';
import LineChart from '../../../mainContents/chartAsset/LineChart.jsx';
import { CardBody, Card, CardHeader, Row, Col } from "reactstrap";
//import BarChart from '../../../mainContents/chartAsset/BarChart';
import PushLeft ,{BoxingCart} from "../subMainStyle";




class Content extends Component {

  render() {
    return (
      <Card style={PushLeft}>
        <CardHeader>Statistique Workflow</CardHeader>
        <CardBody>
              <Row >
                <Col md={{ size: 12, offset: 0 }} style={BoxingCart}>
                    <LineChart />
                </Col>     
              </Row>
                    <Row>&nbsp;</Row>            
                <Row >
                <Col md={{ size: 5, offset: 1 }} style={BoxingCart}>
                    <LineChart />
                </Col>
                <Col md={{ size:5, offset: 1 }} style={BoxingCart}>
                  <LineChart />
                </Col>
            </Row>          
        </CardBody>
      </Card>

    )
  }
}
export default Content