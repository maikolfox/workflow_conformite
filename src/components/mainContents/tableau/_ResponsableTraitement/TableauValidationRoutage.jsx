import React from 'react';
//import { Table } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
//import Loader from 'react-loader-spinner'
import ReactTable from 'react-table';
import "react-table/react-table.css";
import MediaAsset from '../../../assets/MediaAsset'
import Columns from '../../../assets/ColumDetailsFnc'

//import CorrectionRoutageModal from "../modals/CorrectionRoutageModal";
//import TabSwitcher, { Tab, TabPanel } from "./TabSwitcher/TabSwitcher";
import Authorization from '../../Authorization_401';

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
  Row,
  //Col
  
} from "reactstrap";



export default class ValidationRoutage extends React.Component {

  constructor(props) {
    super(props);
    this.state =
    {
      idFnc: '',
      numeroId: '',
      modal: '',
      selected: null,
      responseToPost:[],
      isLoaded: '',
      getRow: '',
      idSource: '',
      idFamile: '',
      idProcessus: '',
      descriptionFnc: '',
      qualification:'',
      hasError: '',
      errorMessage: '',
      valRoutage:null,
      responseSubmit:'',
      unAutorize:false,
      libelleProcesus:'',
      libelleSource:'',
      libelleFamille:''
    }
    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleTodoItemRemoved (id) {
    this.setState(prevState => {
      return {
        responseToPost: prevState.responseToPost.filter(item => {
          return item !== id;
        })
      };
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    console.log(this.state.descriptionFnc);
    console.log(this.state.idFnc);
    console.log(this.state.valRoutage);
     await fetch('/validationRoutage/fnc',
      {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "data":
          { //REMPLACER PLUS TARD PAR LA VARIABLE DE SESSION
            "idResponsable": "maikol.ahoue@bridgebankgroup.com",
            "idFnc":this.state.idFnc,
            "statutRoutage":this.state.valRoutage
          }
        })
      }).then(res => res.json())
      .then(
      (result) => {
        console.log(this.state.selected);
        this.setState(prevState => ({
          responseToPost: prevState.responseToPost.filter(item => {
            return item.idFnc !== this.state.idFnc;
          })
        }))
        this.setState({
          isLoaded: true,
          responseSubmit: result.data.message,
          nestedModal:true,
        });
        console.log(this.state.selected) ;

      },
      (error) => {
        console.log("124",error.message);
        alert("Erreur lors de la communication avec le serveur , contacter les administrateurs si le problème persiste");
        this.setState({
          isLoaded: true,
          errorMessage:error.message,
          hasError:true
        });
      });
    //this.toggleNested();
    this.toggle();
  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal
    });
  }
  toggle() {
    this.setState({valRoutage:null})
    this.setState(prevState => ({
      modal: !prevState.modal,
      selected:!prevState.selected
    }));
  }
  async componentDidMount() {
       await fetch("/consult/fnc",
      {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "data":
          {
            //TODO A remplacer plus tard par  les variable de sessions 
            "idResponsable": "maikol.ahoue@bridgebankgroup.com",
            "idProfil": [
              { "idProfil": 2 }//
            ]
          }
        })
      }).then(res => res.json())
        .then(
          (result) => {
            if(result.data.error=== true || result.data.message==="Accès refuser !" || result.data.responses===null)
            { 
              alert(result.data.message);
              window.close();
  
              this.setState({
                isLoaded: true,
                errorMessage: "Accès refuser !",
                hasError: false,
                unAutorize:true
              });
            }
            else{
            this.setState({
              isLoaded: true,
              responseToPost: result.data.responses
            });
            console.log(this.state.responseToPost)}
          },
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
  render() {
    if(this.state.unAutorize)
    {
        return(<Authorization/>) 
    }

else
    return (
      <React.Fragment>
        {/*REACT  MODAL FORM*/}
        <div>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
            size="lg"
            centered
            aria-labelledby="example-modal-sizes-title-lg"
            modalClassName="modal-90w"

          >
            <ModalHeader toggle={this.toggle}>Validation de la fiche N° {this.state.numeroId} </ModalHeader>
            <ModalBody>
              {/**QUALIFICATION FNC*/}
              <MediaAsset libelle="Qualification" content={this.state.qualification===1 ? "Mineur" :"Majeur"} />
              {/**DESCRIPTION FNC*/}
              <MediaAsset libelle="Description de la non conformite" content={this.state.descriptionFnc} />
              {/**SOURCE*/}
              <MediaAsset libelle="Source" content={this.state.libelleSource} />
              {/**PROCESSUS*/}
              <MediaAsset libelle="Processus" content={this.state.libelleProcesus} />
              {/*FAMILLE*/}
              <MediaAsset libelle="Famille" content={this.state.libelleFamille} />
              <hr></hr>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup check>
                  <FormGroup tag="fieldset">
                    <legend>Validation routage</legend>
                    <FormGroup check>
                      <Label check style={{color:'green'}}>
                        <Input type="radio" name="radio1" onChange={e =>{ 
                        this.setState({valRoutage:true});
                        console.log(this.state.valRoutage)
                        }} />{' '}
                        Routage correct - vous vous chargerez du traitement de la non-conformité
                      </Label>
                    </FormGroup>
                    <FormGroup check style={{color:'red'}}>
                      <Label check>
                        <Input type="radio" name="radio1" onChange={e =>{ 
                        this.setState({valRoutage:false});
                        console.log(this.state.valRoutage)
                        }}  />{' '}
                        Routage incorrect - vous renverrez la fnc a l'organisation pour correction
                      </Label>
                    <Row>&nbsp;</Row>
                    </FormGroup>
                  </FormGroup>
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.handleSubmit} disabled={!(this.state.valRoutage!==null)}>
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
            <ModalHeader toggle={this.toggleNested} >{this.state.responseSubmit}</ModalHeader>
          </Modal>
        </div>
        {/*REACT  TABLE*/}
        <div style={{ cursor: 'pointer' }}>
          <ReactTable
            filterable={true}
            loading={!this.state.isLoaded}
            minRows={5}
            noDataText={(this.state.hasError) ? "Erreur lors de la recuperation des données,contactez les administrateur!" : "Aucune fiche à valider"}
            data={this.state.responseToPost}
            columns={Columns}
            previousText={"Précedent"}
            nextText={"Suivant"}
            rowsText={"Ligne(s)"}
            ofText={"sur "}
            loadingText="Chargement en cours..."
            getTrProps={(state, rowInfo) => {
              if (rowInfo && rowInfo.row) {
                return {
                  onClick: (e) => {
                      e.preventDefault();
                      this.toggle();
                      this.setState({
                        selected: rowInfo.index,
                        getRow: rowInfo,
                        idProcessus: rowInfo.original.idProcessus,
                        numeroId: rowInfo.original.numeroId,
                        descriptionFnc: rowInfo.original.descriptionFnc,
                        idFnc:rowInfo.original.idFnc,
                        libelleProcesus:rowInfo.original.libelleProcesus,
                        libelleSource:rowInfo.original.libelleSource,
                        libelleFamille:rowInfo.original.libelleFamille,
                        qualification:rowInfo.original.qualification

                      });
                      console.log(rowInfo.index);
                  },
                  style: {
                    background: rowInfo.index === this.state.selected ? '#cd511f' : 'white',
                    color: rowInfo.index === this.state.selected ? 'white' : 'black'
                  }
                }
              } else {
                return {}
              }
            }} />
        </div>
      </React.Fragment>)
  }


}