import React, { Component } from 'react';
import LineChart from '../chartAsset/LineChart.jsx';
import { CardBody, Card, CardHeader } from "reactstrap";


class Content extends Component {
  render() {
    return (
    <Card>
      <CardHeader>Statistique Workflow</CardHeader>
      <CardBody>
        <LineChart />
      </CardBody>
    </Card>

    )
  }
}
export default Content