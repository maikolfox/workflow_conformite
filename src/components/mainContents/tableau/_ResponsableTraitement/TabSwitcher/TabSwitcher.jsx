import React, { Component, createContext } from "react";
import {
  Col, Row, Container, Jumbotron, ListGroup, ListGroupItem //Button, Nav, Input, Form, Modal 
} from 'reactstrap';

const context = createContext({});

const { Provider, Consumer } = context;

/**TAB  TELL TO PARENT WHEN IT WAS CLICKED */
const Tab = ({step,minStep =1, maxStep, id, children }) => (
  <Consumer>
    {({ changeTab,activeTabId }) => (
      <Col onClick={() => changeTab(step,minStep,maxStep ,id)}>{children}</Col> 
      
      
      )}
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
  
  changeTab = (step,minStep,maxStep,newTabId) => 
  {
   console.log("newTabId : ",newTabId);
   var index= step==="next" ?  1 : -1;
   
  if ( (index===-1 && (minStep < this.state.activeTabId)) 
  || (index===1 && (this.state.activeTabId <maxStep ) )){

    this.setState(prevState => {
      return {
        activeTabId: prevState.activeTabId+index
      };
     })
       console.log("active tab : "+this.state.activeTabId);
       console.log("maxstep :" +maxStep);
  }    
    
       console.log("_active tab : "+this.state.activeTabId);
       console.log("_maxstep :" +maxStep);
     
   

  
  
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
