import React, { Component } from 'react';
import { Col, Row, Container, Jumbotron, //Button, Nav, Input, Form, Modal 
} from 'reactstrap';

import { Link, Route } from 'react-router-dom';

const ResponsableTraitement = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);

const ResponsableTraitements = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>
    

    
    <Route path={`${match.url}/:topicId`} component={ResponsableTraitement} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

export default ResponsableTraitements;