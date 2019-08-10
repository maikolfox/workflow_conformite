import React from 'react';
//import { Table } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";

import ReactTable from 'react-table';
import "react-table/react-table.css";





export default class TableauCorrection extends React.Component {

  constructor(props) {
    super(props);
    this.state =
      {
       
        responseToPost: ''
      
      }
    //this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleDownload = this.handleDownload.bind(this);
    // this.handleOnChange = this.handleOnChange.bind(this);

  };


  componentDidMount() {
    
   
    // {console.log(this.state.datas)}

    const response =  fetch('/consultationMauvaisRoutage/fnc',
      {
        method: 'GET',
        headers:
        {
          'Content-Type': 'application/json',
        },
      });
    //const body =  response.text();
    console.log(response);
    //this.setState({ responseToPost: JSON.parse(body) });


  }

  render()  {
    const data = [{
      name: 'Tanner Linsley',
      age: 26,
      friend: {
        name: 'Jason Maurer',
        age: 23,
      }
    }];
    const columns = [{
      Header: 'Name',
      accessor: 'name' // String-based value accessors!
    }, {
      Header: 'Age',
      accessor: 'age',
      Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    }, {
      id: 'friendName', // Required because our accessor is not a string
      Header: 'Friend Name',
      accessor: d => d.friend.name // Custom value accessors!
    }, {
      Header: props => <span>Friend Age</span>, // Custom header components!
      accessor: 'friend.age'
    }]
    
    return<ReactTable
      data={this.state.responseToPost.responses}
      columns={columns}
    />
    }


}