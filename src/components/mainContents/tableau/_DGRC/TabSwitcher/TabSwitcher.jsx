import React, { Component, createContext } from "react";
import {
  Col //Row, Container, Jumbotron, ListGroup, ListGroupItem //Button, Nav, Input, Form, Modal 
} from 'reactstrap';

const context = createContext({});

const { Provider, Consumer } = context;

/**TAB  TELL TO PARENT WHEN IT WAS CLICKED */
const Tab = ({step,minStep =1, maxStep, id, children ,md="auto" }) => (
  <Consumer>
    {({ changeTab}) => (<Col md={md} onClick={() => changeTab(step,minStep,maxStep ,id)}>{children}</Col>)}
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

   if(step!=="nope"){
   var index = step==="extends" ? 6 : step==="next" ?  1 : -1;
   
   console.log(index);
   //console.log(this.state.activeTabId);
  

   if (step==="retourRecap")
   {
     console.log("in extends")
     this.setState({
         activeTabId: 5
      })
     
   }


  
  if(this.state.activeTabId===10)
  {
      console.log("extend for 10") ;

  }

  if ( (index===-1 && (minStep < this.state.activeTabId)) || (index===1 && (this.state.activeTabId <maxStep ) ))
  {
    this.setState(prevState => {
      return {
        activeTabId: prevState.activeTabId+index
      };
     })
 
  } 
  
  if (step==="extends")
  {
    console.log("in extends")
    this.setState({
        activeTabId: 10
     })
    
  }
  

  if (step==="new")
  {
    console.log("in new")
    this.setState({
        activeTabId: 2
     })
  }
 }

  if(typeof step ==="number" )
  {
  console.log("going to step : "+step)
  this.setState({
      activeTabId: step
   })
  }
  
  
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
