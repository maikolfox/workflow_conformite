import React from 'react';
//import { Table } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
//import Loader from 'react-loader-spinner'
import ReactTable from 'react-table';
import "react-table/react-table.css";

import Processus from "../../../assets/Processus";
import Source from "../../../assets/Source";
import FamilleProcessus from "../../../assets/FamilleProcessus";
import Loader from "../../../assets/Loader";
import Columns from '../../../assets/ColumDetailsFnc';
import QualificationList from "../../../assets/qualificationList";




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



export default class TableauCorrection extends React.Component {

  constructor(props) {
    super(props);
    this.state =
      {
        nestedModal:false ,
        modal: false,
        idFnc:'',
        numeroId:'' ,
        selected: null,
        responseToPost: '',
        isLoaded:'',
        getRow:'',
        idSource:'',
        //idFamile:'',
        idProcessus:'',
        idProcessusIsSet:true,
        familleIsSet:true,
        descriptionFnc:'',
        hasError:'',
        errorMessage:'',
        famille:'',
        familleProcessus:FamilleProcessus,
        listeProcessus:Processus,
        qualification:"",
        libelleProcessus:"",
        libelleSource:"",
        libelleFamille:""
      }
    //this.handleSubmit = this.handleSubmit.bind(this);
    //this.handleDownload = this.handleDownload.bind(this);
    // this.handleOnChange = this.handleOnChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);

    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeProcessus=this.handleChangeProcessus.bind(this);
    this.loadData=this.loadData.bind(this);
  };

  handleChangeProcessus = e => {
    e.preventDefault();
    var filtFam = FamilleProcessus.filter(item => {
      return item.idProcessus === e.target.value;
    });
    this.setState({ familleProcessus: filtFam, idProcessus: e.target.value });
    console.log(filtFam, this.state.idProcessus);
      this.setState({famille:filtFam[0].idFamille,familleIsSet :(filtFam[0].idFamille==="")?false:true})
  };
  
  handleSubmit = async e=>{
    const libelleProcessus =this.state.listeProcessus.find(el=>{return el.idProcessus===this.state.idProcessus}).libelleProcessus;
    const libelleFamile =FamilleProcessus.find(el=>{return el.idFamille===this.state.famille}).libelleFamille;
    const libelleSource=Source.find(el=>{return el.idSource===this.state.idSource}).libelleSource;
    e.preventDefault();
      await fetch('/correctionRoutage/fnc',
        {
          method: 'POST',
          headers:
          {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "data": 
            {	        
                "idFnc":this.state.idFnc ,
                "idProcessus":this.state.idProcessus,
                "idSource":this.state.idSource,
                //TODO REMPLACE PAR LE SESSION ID
                "idActeur": "maikol.ahoue@bridgebankgroup.com",
                "descriptionFNC":this.state.descriptionFnc,
                "qualification":this.state.qualification,
                "famille":this.state.famille,
                "numeroId":this.state.numeroId,
                "libelleProcessus":libelleProcessus,
                "libelleSoure":libelleSource,
                "libelleFamile":libelleFamile

                
              }
            }),
        }).then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              responseSubmit: result.data.message,
              hasError: true
            });
            this.loadData()
          },
          (error) => {
            console.log("124", error.message);
            alert("Erreur lors de la communication avec le serveur , contacter les administrateurs si le problème persiste");
            this.setState({
              isLoaded: true,
              responseSubmit:"Erreur lors de la communication avec le serveur : "+error.message,
              hasError: true
            });
          }); 
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
      modal: !prevState.modal
    }));
    this.setState({
      descriptionFnc: '',
      descriptionFncIsSet: false,
      idProcessus: "",
      idProcessusIsSet: false,
      qualification:'',
      qualificationIsSet:false,
      idSource:'',
      idSourceIsSet:false,
      familleIsSet:false,
      famille:"",
      hasError: false,
      familleProcessus:FamilleProcessus,
      listeProcessus:Processus,
      selected:null,
      libelleProcesus:"",
      libelleFamile:"",
      libelleSource:""
    });
  }

  async loadData(){
    await fetch("/consultationMauvaisRoutage/fnc")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          responseToPost: result.data
        });
      },
      (error) => {
        console.log("124", error.message);
        alert("Erreur lors de la communication avec le serveur , contacter les administrateurs si le problème persiste");
        this.setState({
          isLoaded: true,
          responseSubmit:"Erreur lors de la communication avec le serveur : "+error.message,
          hasError: true
        });
      });         
  //const body = await response.text();
  // this.setState({ responseToPost: JSON.parse(body) });  
  console.log(this.state.responseToPost.responses);
  
  //this.toggle();
 

  }

async componentDidMount() {
   
  this.loadData()
      
  }
  
  render()  {
    

  var response=(this.state.isLoaded) ? this.state.responseSubmit : <React.Fragment><Loader></Loader><p style={{textAlign:'center'}}>Chargement en cours...</p></React.Fragment>
  var source =Source.map((item, i) => {
    return (
      <option key={i} value={item.idSource}>
        {item.libelleSource}
      </option>
    );
  });
  var famProc =
  this.state.familleProcessus.length > 0 &&
  this.state.familleProcessus.map((item, i) => {
    return (
      <option key={i} value={item.idFamille}>
        {item.libelleFamille}
      </option>
    );
  });
const { listeProcessus } = this.state;
let proceList =
  listeProcessus.length > 0 &&
  listeProcessus.map((item, i) => {
    return (
      <option key={i} value={item.idProcessus}>
        {item.libelleProcessus}
      </option>
    );
  }, this);
    
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
          backdrop="static"
        >
          <ModalHeader toggle={this.toggle}>Formulaire de correction de la non-conformité N° {this.state.numeroId}</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup >
                {/**QUALIFICATION */}
                <Label for="exampleEmail" md={12}>Qualification de la non conformité:</Label>
                <Col md={{ size: 12, order: 1, offset: -1 }}>
                  <Input valid={this.state.qualificationIsSet} //invalid={!this.state.qualificationIsSet}
                    type="select"
                    id="selectAgence"
                    name="selectbasic"
                    value={this.state.qualification}
                    onChange={e => {
                      this.setState({ qualification: e.target.value })
                      if (e.target.value !== null && e.target.value!=="" ) {
                        this.setState({ qualificationIsSet: true })
                      
                      }
                      else { this.setState({ qualificationIsSet: false }) }
                    }}>
                    <option value="" defaultValue ></option>
                    {QualificationList}
                  </Input>
                  <FormText hidden={this.state.qualificationIsSet}>Selectionner la qualification</FormText>
                </Col>
                <Row>&nbsp;</Row>
                {/**PROCESSUS */}
                <Label for="exampleEmail" md={4}>Selectionner le processus :</Label>
                <Col md={{ size: 12, order: 1, offset: -1 }}>
                  <Input valid={this.state.idProcessusIsSet} //invalid={!this.state.idProcessusIsSet}
                    type="select"
                    id="selectAgence"
                    name="selectbasic"
                    value={this.state.idProcessus}
                    onChange={e => {
                      this.setState({ idProcessus: e.target.value })
                      if (e.target.value !== null && e.target.value!=="" ) {
                        this.setState({ idProcessusIsSet: true })
                       
                      }
                      else { this.setState({ idProcessusIsSet: false }) }
                      this.handleChangeProcessus(e)
                    }
                    }>
                    <option value="" defaultValue ></option>
                    {proceList}
                  </Input>
                  <FormText hidden={this.state.idProcessusIsSet}>Selectionner processus</FormText>
                </Col>
                {/**SOURCE */}
                <Row>&nbsp;</Row>
                <Label for="exampleEmail" md={4}>Selectionner la source :</Label>
                <Col md={{ size: 12, order: 1, offset: -1 }}>
                  <Input valid={this.state.idSourceIsSet} ////invalid={this.state.idSourceIsSet}
                    type="select"
                    id="selectAgence"
                    name="selectbasic"
                    value={this.state.idSource}
                    onChange={e => {
                      this.setState({ idSource: e.target.value })
                      if (e.target.value !== null && e.target.value!=="" ) {
                        this.setState({ idSourceIsSet: true })
                      }
                      else { this.setState({ idSourceIsSet: false }) }
                    }
                    }>
                    <option value="" defaultValue ></option>
                    {source}
                  </Input>
                  <FormText hidden={this.state.idSourceIsSet}>Selectionner la source</FormText>
                </Col>
                {/*FAMILLE */}
                <Row>&nbsp;</Row>
                <Label for="selectFamille" md={4}>Selectionner la famille :</Label>
                <Col md={{ size: 12, order: 1, offset: -1 }}>
                  <Input valid={this.state.familleIsSet} //invalid={!this.state.familleIsSet}
                    type="select"
                    id="selectFamille"
                    name="selectFamille"
                    value={this.state.famille}
                    onChange={e => {
                      this.setState({ famille: e.target.value })
                      if (e.target.value !== null && e.target.value!=="" ) {
                        this.setState({ familleIsSet: true })
                      }
                      else { this.setState({ familleIsSet: false }) }
                    }
                    }>{/**TODO FAMILLE */}
                    {/* <option value="" defaultValue ></option> */}
                   {famProc}
                  </Input>
                  <FormText hidden={this.state.familleIsSet}>Selectionner la famille</FormText>
                </Col>
                <Row>&nbsp;</Row>
                {/**DESCRIPTION DE LA NON CONFORMITE */}
                <Label for="exampleEmail" md={12}>Description de la non conformité entre 99 et 600 caractères ( {this.state.descriptionFnc.length}/600) :  </Label>
                <Col md={{ size: 12, order: 1, offset: -1 }}>
                  <Input valid={this.state.descriptionFncIsSet} //invalid={!this.state.descriptionFncIsSet}
                    type="textarea"
                    id="selectAgence"
                    name="selectbasic"
                    maxLength="600"
                    minLength="100"
                    value={this.state.descriptionFnc}
                    onChange={e => {
                      this.setState({ descriptionFnc: e.target.value })

                      if (e.target.value !== null &&  e.target.value !== '' && e.target.value.trim() !== "" &&  e.target.value.length>=100) {
                        this.setState({ descriptionFncIsSet: true })
                      }
                      else { this.setState({ descriptionFncIsSet: false }) }}}>
                  </Input>
                  <FormText hidden={this.state.descriptionFncIsSet}>Décrire la non conformité (100 caratères minimun) </FormText>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.handleSubmit} disabled={
              !(this.state.descriptionFncIsSet && this.state.familleIsSet && this.state.idProcessusIsSet && this.state.idSourceIsSet && this.state.qualificationIsSet)
            }
            >
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
          size="sm"
          backdrop="static"
        >
          <ModalHeader toggle={this.toggleNested} >{response}</ModalHeader>
        </Modal>
      </div>        
     {/*REACT  MODAL FORM*/}      
     <div style={{ cursor: 'pointer' }}>
   
     
     <ReactTable
      filterable={true}
      loading={!this.state.isLoaded}  noDataText={(this.state.hasError) ? "Erreur lors de la recuperation des données,contactez les administrateurs !" :"Aucune fiche à corriger"}
      minRows={5}
      data={this.state.responseToPost.responses}
      columns={Columns}
      previousText={"Précedent"}
      nextText={"Suivant"}
      rowsText={"Ligne(s)"}
      ofText={"sur "}
      caseInsensitiveFiltering = {true}
      subStringFiltering = {true}
      loadingText="Chargement en cours..."
      getTrProps={(state, rowInfo) => {
        if (rowInfo && rowInfo.row) {
          return {
            onClick: (e) => {         
              e.preventDefault();
              this.toggle();
              this.setState({
                selected: rowInfo.index,
                getRow:rowInfo,
                idProcessus:rowInfo.original.idProcessus,
                numeroId:rowInfo.original.numeroId,
                idFnc:rowInfo.original.idFnc,
                descriptionFnc:rowInfo.original.descriptionFnc,         
                famille:rowInfo.original.idFamille,
                idSource:rowInfo.original.idSource,
                idProcessusIsSet: true,
                qualification:rowInfo.original.qualification,
                qualificationIsSet:true,
                familleIsSet:true,
                idSourceIsSet:true,
                descriptionFncIsSet:true,
                libelleFamille:rowInfo.original.libelleFamille,
                libelleSource:rowInfo.original.libelleSource ,
                libelleProcessus:rowInfo.original.libelleProcesus
              });
              console.log(rowInfo.original);
            },
            style: {
              background: rowInfo.index === this.state.selected ? '#cd511f' : 'white',
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