import React from 'react';
//import { Table } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
//import Loader from 'react-loader-spinner'
import ReactTable from 'react-table';
import "react-table/react-table.css";
import MediaAsset from '../../../assets/MediaAsset'
//import CorrectionRoutageModal from "../modals/CorrectionRoutageModal";
import TabSwitcher, { Tab, TabPanel } from "./TabSwitcher/TabSwitcher";

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
  Row, Col

} from "reactstrap";

var data_;


export default class DemarrageAnalyse extends React.Component {

  constructor(props) {
    super(props);
    this.state =
      {
        idFnc: '',
        numeroId: '',
        modal: '',
        selected: null,
        responseToPost: [],
        isLoaded: '',
        getRow: '',
        idSource: '',
        idFamile: '',
        idProcessus: '',
        descriptionFnc: '',
        qualification: '',
        hasError: '',
        errorMessage: '',
        valRoutage: null,
        responseSubmit: ''
      }
    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };


  handleSubmit = async e => {
    e.preventDefault();
    console.log(this.state.descriptionFnc);
    console.log(this.state.idFnc);
    console.log(this.state.valRoutage);


    const response = await fetch('/validationRoutage/fnc',
      {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "data":
          {
            "idResponsable": "maikol.ahoue@bridgebankgroup.com",
            "idFnc": this.state.idFnc,
            "statutRoutage": this.state.valRoutage
          }
        })
      }).then(res => res.json())
      .then(
        (result) => {
          console.log(this.state.selected);
          data_ = data_.splice(this.state.selected, 1);
          this.setState({
            isLoaded: true,
            responseSubmit: result.data.message,
            nestedModal: true,
          });

          this.forceUpdate();
        },
        (error) => {
          console.log("124", error.message);
          alert("Erreur lors de la communication avec le serveur , contacter les administrateurs si le problème persiste");
          this.setState({
            isLoaded: true,
            errorMessage: error.message,
            hasError: true
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
    this.setState({ valRoutage: null })
    this.setState(prevState => ({
      modal: !prevState.modal,
      selected: !prevState.selected
    }));
  }
  async componentDidMount() {
    const fetchstat = await fetch("http://localhost:3553/api/consult/fnc",
      {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "data":
          {
            "idResponsable": "maikol.ahoue@bridgebankgroup.com",
            "idProfil": [
              { "idProfil": 2 }
            ]
          }
        })
      }).then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            responseToPost: result.data.responses
          });
          data_ = result.data.responses;
          console.log(this.state.responseToPost)
        },
        (error) => {
          console.log("124", error.message);
          alert("Erreur lors de la communication avec le serveur , contacter les administrateur si le problème persiste");
          this.setState({
            isLoaded: true,
            errorMessage: error.message,
            hasError: true
          });
        })
  }
  render() {

    const columns = [
      {
        Header: 'Date de déclaration',
        accessor: 'dateDeclaration',
      },
      {
        Header: 'Numéro de fiche',
        accessor: 'numeroId',
      },
      {
        Header: 'Description de la fiche',
        accessor: 'descriptionFnc',
      },

      {
        Header: 'Processus',
        accessor: 'idProcessus',
      }
    ]
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
          >
            <ModalHeader toggle={this.toggle}>Demarrage de l'analyse</ModalHeader>
            <ModalBody>
              <TabSwitcher>
                {/* ETAPE 1 ANALYSE */}
                <TabPanel whenActive={1}>
                  {/* RECAPITULATIF DES INFOS DE LA FICHE */}
                  <h1 style={{ textAlign: "center" }}>FICHE N° {this.state.numeroId} </h1>
                  {/**QUALIFICATION FNC*/}
                  <MediaAsset libelle="Qualification" content={this.state.qualification} />
                  {/**DESCRIPTION FNC*/}
                  <MediaAsset libelle="Description de la non conformite" content={this.state.descritpionFnc} />
                  {/**SOURCE*/}
                  <MediaAsset libelle="Source" content={this.state.source} />
                  {/**PROCESSUS*/}
                  <MediaAsset libelle="Processus" content={this.state.idProcessus} />
                  {/*FAMILLE*/}
                  <MediaAsset libelle="Famille" content={this.state.idFamile} />
                </TabPanel>

                {/* ETAPE 2 ANALYSE */}
                <TabPanel whenActive={2}>
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup check>
                      <FormGroup tag="fieldset">
                      <h1 style={{ textAlign: "center" }}>2</h1>
                        <legend>Validation routage</legend>
                        <FormGroup check>
                          <Label check style={{ color: 'green' }}>
                            <Input type="radio" name="radio1" onChange={e => {
                              this.setState({ valRoutage: true });
                              console.log(this.state.valRoutage)
                            }} />{' '}
                            Routage correct - vous vous chargerez du traitement de la non-conformité
                      </Label>
                        </FormGroup>
                        <FormGroup check style={{ color: 'red' }}>
                          <Label check>
                            <Input type="radio" name="radio1" onChange={e => {
                              this.setState({ valRoutage: false });
                              console.log(this.state.valRoutage)
                            }} />{' '}
                            Routage incorrect - vous renverrez la fnc a l'organisation pour correction
                      </Label>
                          <Row>&nbsp;</Row>
                        </FormGroup>
                      </FormGroup>
                    </FormGroup>
                  </Form>
                </TabPanel>
                
                {/* ETAPE 3 ANALYSE */}
                <TabPanel whenActive={3}>
                  {/* RENSEIGNEMENT DU FORMULAIRE 1 */}
                  <h1 style={{ textAlign: "center" }}>3</h1>
                  {/**QUALIFICATION FNC*/}
                  <MediaAsset libelle="Qualification" content={this.state.qualification} />
                  {/**DESCRIPTION FNC*/}
                  <MediaAsset libelle="Description de la non conformite" content={this.state.descritpionFnc} />
                  {/**SOURCE*/}
                  <MediaAsset libelle="Source" content={this.state.source} />
                  {/**PROCESSUS*/}
                  <MediaAsset libelle="Processus" content={this.state.idProcessus} />
                  {/*FAMILLE*/}
                  <MediaAsset libelle="Famille" content={this.state.idFamile} />
                </TabPanel>
                
                {/* Cette section permet de
                 positionner 
                 les bouttons "suivant" et 
                "precedent" et de le masquer au besoin 
                */}
                <Row noGutters="true" >
                  <TabPanel whenActive={1}>
                  <Col md="10" ></Col>
                    <Tab id="3" maxStep={3}  step="next">
                      <Button>{'Suivant >>'}</Button>
                    </Tab>
                  </TabPanel>     
                  <TabPanel whenActive={2}>
                  <Tab id="1" maxStep={3} step="prev" >
                    <Button>{'<< Précedent'}</Button>
                  </Tab>
                  <Col md="8" ></Col>
                  <Tab id="3" maxStep={3}  step="next">
                      <Button>{'Suivant >>'}</Button>
                    </Tab>
                  </TabPanel>
                  <TabPanel whenActive={3}>
                  <Tab id="1" maxStep={3} step="prev" >
                    <Button>{'<< Précedent'}</Button>
                  </Tab>
                  </TabPanel>
                </Row>
              </TabSwitcher>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.handleSubmit} disabled={!(this.state.valRoutage !== null)}>
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
            columns={columns}
            previousText={"Précedent"}
            nextText={"Suivant"}
            rowsText={"Ligne(s)"}
            ofText={"sur "}
            loadingText="Chargement en cours..."
            getTrProps={(state, rowInfo) => {
              if (rowInfo && rowInfo.row) {
                return {
                  onClick: (e) => {
                    {
                      e.preventDefault();
                      this.toggle();
                      this.setState({
                        selected: rowInfo.index,
                        getRow: rowInfo,
                        idProcessus: rowInfo.original.idProcessus,
                        numeroId: rowInfo.original.numeroId,
                        descriptionFnc: rowInfo.original.descriptionFnc,
                        idFnc: rowInfo.original.idFnc,
                      });
                      console.log(rowInfo.index);
                    }
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