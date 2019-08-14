import React, { Component } from 'react';
import LineChart from '../../../mainContents/chartAsset/LineChart.jsx';
import { CardBody, Card, CardHeader, Row, Col } from "reactstrap";
import BarChart from '../../../mainContents/chartAsset/BarChart';

var boxingChart = {
  border: '1px solid gray', borderRightColor: 'black',
  boxShadow: "1px 3px 1px #9E9E9E"
};

var pushLeft={

  marginLeft:'30px'


}
class Content extends Component {

  render() {
    return (
      <Card style={pushLeft}>
        <CardHeader>Statistique Workflow</CardHeader>
        <CardBody>
              <Row >
                <Col md={{ size: 12, offset: 0 }} style={boxingChart}>
                    <LineChart />
                </Col>     
              </Row>
                    <Row>&nbsp;</Row>            
                <Row >
                <Col md={{ size: 5, offset: 1 }} style={boxingChart}>
                    <LineChart />
                </Col>
                <Col md={{ size:5, offset: 1 }} style={boxingChart}>
                  <LineChart />
                </Col>
            </Row>          
        </CardBody>
      </Card>

    )
  }
}
export default Content