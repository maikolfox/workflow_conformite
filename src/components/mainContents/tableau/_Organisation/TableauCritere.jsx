import React from 'react';
//import { Table } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner'
import ReactTable from 'react-table';
import "react-table/react-table.css";
//import CorrectionRoutageModal from "../modals/CorrectionRoutageModal";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Form,
  Label,
  Col,
  FormText,
  Row
} from "reactstrap";



export default class TableauCritere extends React.Component {

  constructor(props) {
    super(props);
    this.state =
      {
        idFnc:'',
        numeroId:'' ,
        modal:'',
        selected: null,
        responseToPost: '',
        isLoaded:'',
        getRow:'',
        idSource:'',
        idFamile:'',
        idProcessus:'',
        descritpionFnc:'',
        procIsSet:'',
        hasError:'',
        errorMessage:''
      }
    //this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleDownload = this.handleDownload.bind(this);
    // this.handleOnChange = this.handleOnChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);

    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };


  


  

  handleSubmit = async e=>{
    e.preventDefault();
    console.log(this.state.descritpionProc);
    
      const response = await fetch('/correctionRoutage/fnc',
        {
          method: 'POST',
          headers:
          {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "data": 
            {	        
                "idFnc":this.props.idFnc ,
                "idProcessus":this.props.idProcessus,
                "idSource":this.props.idSource,
                "idActeur": "maikol.ahoue@bridgebankgroup.com",
                "descriptionFNC":this.props.descriptionFnc
            }
            }),
        });
      const body = await response.text();
      this.setState({ responseToPost: JSON.parse(body) });  
      console.log(this.state.responseToPost);
      console.log(this.state.processus);
      this.setState({ processus: null });
      this.setState({ descritpionProc: "" });
      this.setState({ descIsSet: false });
      this.setState({ procIsSet: false });
      this.toggleNested();
      this.toggle();
  }

    toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal
    });
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

componentDidMount() {
  const fetchstat=  fetch("http://localhost:3553/api/consultationMauvaisRoutage/fnc")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            responseToPost: result
          });
        },
       
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log("124",error.message);
          alert("Erreur lors de la communication avec le serveur , contacter les administrateur si le problème persiste");
          this.setState({
            isLoaded: true,
            errorMessage:error.message,
            hasError:true
          });
        })

      
  }
  


  render()  {
    
    const columns = [
    {
      Header: 'Date de déclaration',
      accessor: 'dateDeclaration' ,// String-based value accessors!
    }, 
    {
      Header: 'Numéro de fiche',
      accessor: 'numeroId',
      style: { whiteSpace: 'unset' },
    }, 
    {
      Header: 'Description de la fiche',
      accessor: 'descriptionFnc',
    }, 
 
    {
      Header:'Processus',
      accessor: 'idProcessus',
    }
  ]
  
    return(
    <React.Fragment>

    <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          size="lg"
          centered
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <ModalHeader toggle={this.toggle}>Correction de la fiche N° {this.state.numeroId} </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup >
                {/**DESCRIPTION FNC*/}
                <Label for="exampleEmail" md={12}>Description de la non conformité entre 100 et 600 caractères ( {this.state.descritpionFnc.length}/600) :  </Label>
                <Col md={{ size: 12, order: 1, offset: -1 }}>
                  <Input valid={this.state.descIsSet} invalid={!this.state.descIsSet}
                    type="textarea"
                    maxlength="600"
                    id="selectAgence"
                    name="selectbasic"
                    value={this.state.descritpionFnc}
                    onChange={e => {
                      this.setState({ descritpionFnc: e.target.value })
                      if ((e.target.value !== null &&  e.target.value !== '' && e.target.value.trim !== null) && ( e.target.value.length>=100 && e.target.value.length<=600)) {
                        this.setState({ descIsSet: true })
                      }
                      else { this.setState({ descIsSet: false }) }}}>
                  </Input>
                  <FormText hidden={this.state.descIsSet}>Décrire la non conformité (100 caratères minimun) </FormText>
                </Col>
                <Row>&nbsp;</Row>
                {/**SOURCE*/}
                <Label for="exampleEmail" md={4}>Source :</Label>
                <Col md={{ size: 12, order: 1, offset: -1 }}>
                  <Input valid={this.state.sourceIsSet} invalid={!this.state.sourceIsSet}
                    type="select"
                    id="selectSource"
                    name="selectSource"
                    value={this.state.idSource}
                    onChange={e => {
                      this.setState({idSource: e.target.value})
                      if (e.target.value !== null && e.target.value!=="" ) 
                      {this.setState({ sourceIsSet: true })}
                      else { this.setState({ sourceIsSet: false })}}}>
                    <option value="" defaultValue ></option>
                    <option value="M1">M1-Gerer la relation client</option>
                    <option value="M2">Processus 2</option>
                  </Input>
                  <FormText hidden={this.state.sourceIsSet}>Selectionner la source</FormText>
                </Col>
                <Row>&nbsp;</Row>
                {/**PROCESSUS*/}
                <Label for="exampleEmail" md={4}>Processus :</Label>
                <Col md={{ size: 12, order: 1, offset: -1 }}>
                  <Input valid={this.state.procIsSet} invalid={!this.state.procIsSet}
                    type="select"
                    id="selectProcessus"
                    name="selectProcessus"
                    value={this.state.idProcessus}
                    onChange={e => {
                      this.setState({idProcessus: e.target.value})
                      if (e.target.value !== null && e.target.value!=="" ) 
                      {this.setState({ procIsSet: true })}
                      else { this.setState({ procIsSet: false })}}}>
                    <option value="" defaultValue ></option>
                    <option value="M1">M1-Gerer la relation client</option>
                    <option value="M2">Processus 2</option>
                  </Input>
                  <FormText hidden={this.state.procIsSet}>Selectionner le processus</FormText>
                </Col>
                <Row>&nbsp;</Row>
                {/*TODOS liste id famille processus - FAMILLE*/ }
                <Label for="exampleEmail" md={4}>Famille :</Label>
                <Col md={{ size: 12, order: 1, offset: -1 }}>
                  <Input valid={this.state.sourceIsSet} invalid={!this.state.sourceIsSet}
                    type="select"
                    id="selectSource"
                    name="selectSource"
                    value={this.state.idFamille}
                    onChange={e => {
                      this.setState({idFamille: e.target.value})
                      if (e.target.value !== null && e.target.value!=="" ) 
                      {this.setState({ familleIsSet: true })}
                      else { this.setState({ familleIsSet: false })}}}>
                    <option value="" defaultValue ></option>
                    <option value="M1">M1-Gerer la relation client</option>
                    <option value="M2">Processus 2</option>
                  </Input>
                  <FormText hidden={this.state.familleIsSet}>Selectionner la famille</FormText>
                </Col>
                <Row>&nbsp;</Row>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.handleSubmit} disabled={!(this.state.descIsSet && this.state.procIsSet && this.state.sourceIsSet && this.state.familleIsSet)}>
              Soumettre
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Annuler
            </Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.nestedModal}
          toggle={this.toggleNested}
          onClosed={this.state.closeAll ? this.toggle : undefined}
          centered
          size="sm">
          <ModalHeader toggle={this.toggleNested} >Correction effectuée</ModalHeader>
        </Modal>
      </div>        
     {/*REACT  MODAL FORM*/}      
     <div style={{ cursor: 'pointer' }}>
   
     
     <ReactTable
       loading={!this.state.isLoaded}
      manual  
      noDataText={(this.state.hasError) ? "Erreur lors de la recuperation des données,contactez les administrateur!" :"Aucune fiche à corriger"}
      minRows={5}
      data={this.state.responseToPost.responses}
      columns={columns}
      previousText={"Précedent"}
      nextText={"Suivant"}
      rowsText={"Ligne(s)"}
      ofText={"sur "}
      loadingText="Chargement en cours..."
      getTrProps={(state, rowInfo) => {
        if (rowInfo && rowInfo.row) {
          return {
            onClick: (e) => {{
              e.preventDefault();
              this.toggle();
              this.setState({
                selected: rowInfo.index,
                getRow:rowInfo,
                idProcessus:rowInfo.original.idProcessus,
                numeroId:rowInfo.original.numeroId,
                descritpionFnc:rowInfo.original.descriptionFnc,
                procIsSet:true,
                descIsSet:true
              });
              console.log(rowInfo.original);
            }},
            style: {
              background: rowInfo.index === this.state.selected ? '#00afec' : 'white',
              color: rowInfo.index === this.state.selected ? 'white' : 'black'
            }}
        }else{
          return {}
        }
      }}/>
    </div>
    </React.Fragment>)
    }


}