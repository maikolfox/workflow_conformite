import React from 'react';
import '../css/simple-sidebar.css';
import Test from './Test';
import {
  Route, //Link, 
  BrowserRouter as Router //Switch 
} from 'react-router-dom';
import {
  //Container, 
  Row,
  Col,
  // ListGroup, 
  //ListGroupItem
}
  from "reactstrap";



class PanelWorkFlow extends React.Component {


  render() {

    return (
      <Router>
        <Row>

          <Col md={{ size: 3, order: 0, offset: 0 }}>
            <div className="d-flex" id="wrapper">
              {/* <!-- Sidebar --> */}
              <div className="bg-light border-right" id="sidebar-wrapper">
                <div className="sidebar-heading">img bbg</div>
                <div class="list-group list-group-flush">
                  <a href="/TauxDactivite" className="list-group-item list-group-item-action bg-light">Tache à traiter </a>
                  <a href="/TEST" className="list-group-item list-group-item-action bg-light">Etats</a>
                  <a href="#" className="list-group-item list-group-item-action bg-light">Statistique</a>
                </div>
              </div>
              {/* <!-- /#sidebar-wrapper --> */}
            </div>
          </Col>
          <Col md="9"> <Route path="/TauxDactivite" component={Test} /></Col>
          <Col md="9"> <Route path="/TEST" component={Test} />test</Col>

        </Row>
      </Router>

    )
  }
}
export default PanelWorkFlow;