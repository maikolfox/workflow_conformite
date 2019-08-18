import React, { Component, createContext } from "react";
import {
  Col, Row, Container, Jumbotron, ListGroup, ListGroupItem //Button, Nav, Input, Form, Modal 
} from 'reactstrap';

const context = createContext({});

const { Provider, Consumer } = context;

/**TAB  TELL TO PARENT WHEN IT WAS CLICKED */
const Tab = ({step, id, children }) => (
  <Consumer>
    {({ changeTab }) => <Col onClick={() => changeTab(step,id)}>{children}</Col>}
  </Consumer>
);

/** DISPLAY THE COMPONENT SPECIFIED BY THE PARENT */
const TabPanel = ({ whenActive, children }) => (
  <Consumer>
    {({ activeTabId }) => (activeTabId === whenActive ? children : null)}
  </Consumer>
);
/**TELL TO THE TABPANEL WICH COMPONENT TO DISPLAY */
class TabSwitcher extends Component {
  state = {
    activeTabId: 1
  };
  
  changeTab = (step,newTabId) => 
  {
   console.log("newTabi : ",newTabId);
   var index= step==="next" ?  1 : -1;
   console.log(index);
   this.setState(prevState => {
    return {
      activeTabId: prevState.activeTabId+index
    };
  })


  
  
  };

  render() {
    return (
      <Provider
        value={{
          activeTabId: this.state.activeTabId,
          changeTab: this.changeTab
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default TabSwitcher;
export { Tab, TabPanel };
