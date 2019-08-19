import React from 'react';
//import { Table } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
//import Loader from 'react-loader-spinner'
import ReactTable from 'react-table';
import ReactTableActeur from 'react-table';
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
  FormText,
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
        selectedActeur:null,
        responseToPost: [],
        isLoaded: '',
        getRow: '',
        idSource: '',
        idFamile: '',
        idProcessus: '',
        descriptionFnc: '',
        qualification: '',
        
        acteurTraitant:'',
        correction:'',
        correctionIsSet:'',

        actionCorrective:'',
        actionCorrectiveIsSet:'',
        
        cause:'',
        causeIsSet:'',

        libelle:0,

        echeance:'',
        echeanceIsSet:'',

        hasError: '',
        errorMessage: '',
        valRoutage: null,
        responseSubmit: '',

        dataStruc:[]

      }
    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.currentDate = this.currentDate.bind(this);

  };

  
  
  
    createAnalyse = event => 
    {
      event.preventDefault();
  
      const newItem = {
        actionCorrective: this.state.actionCorrective,
        correction: this.state.correction,
        echeance:   this.state.echeance,
        cause:this.state.cause,
        idActeurDelegataire:'ahoueromeo@gmail.com',
        idActeur:this.state.acteurTraitant
        
      };
      this.setState(prevState => ({
        dataStruc: prevState.dataStruc.concat(newItem)
      }));
    console.log(this.state.dataStruc);
    };
    

  


  currentDate()
  { //January is 0!
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();
    today= yyyy +'-'+ mm + '-' +dd ;
    console.log("today na today : ",today);
    return today;
  }

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
    ];

    const acteurList= () =>(
 

      <ul>
         {this.state.dataStruc.map(item => (
           <li key={item.actionCorrective}>
             <div>{item.correction}</div>
             <div>{item.echeance}</div>
             <div>{item.cause}</div>
             <div>{item.idActeurDelegataire}</div>
           </li>
         ))}
       </ul>
     
     )


    const ActeurColumns = [
      {
        Header: 'Prenom nom',
        accessor: 'nomPrenom',
      },
   
      {
        Header: 'Fonction',
        accessor: 'fonction',
      },

      {
        Header: 'Service',
        accessor: 'service',
      },
      
      {
        Header: 'email',
        accessor: 'id',
      },

    ]

    const analyseColum=[
 

      {
        Header: 'Action corrective',
        accessor: 'actionCorrective',
      },
   
      {
        Header: 'Cause',
        accessor: 'cause',
      },

      {
        Header: 'Correction',
        accessor: 'correction',
      },
      
      {
        Header: 'Echeance',
        accessor: 'echeance',
      },

      {
        Header: 'Acteur',
        accessor: 'idActeur',
      },
    ]

    const dataActeur=[
      {
        nomPrenom: 'Ahoue romeo',
        fonction: 'Developper web',
        service: 'IT',
        id:'ahoueromeo@gmail.com'
      },
      {
        nomPrenom: 'Ahoue Maikol',
        fonction:'Analyste programmeur',
        service: 'RH',
        id:'maikol.ahoue@gmail.com'
      }

    ];
    /* actionCorrective: this.state.actionCorrective,
        correction: this.state.correction,
        echeance:   this.state.echeance,
        cause:this.state.cause,
        idActeurDelegataire:'ahoueromeo@gmail.com',
        idActeur:this.state.acteurTraitant */

   
  

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
            backdrop="static"
          >
            <ModalHeader toggle={this.toggle}>Demarrage de l'analyse</ModalHeader>
            <ModalBody>
              <TabSwitcher>
                {/* ETAPE 1 RECAPITULATIF DES INFOS DE LA FICHE  */}
                <TabPanel whenActive={1}>
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

                {/* ETAPE 2 FORMULAIRE ANALYSE */}
                <TabPanel whenActive={2}>
                  <Form onSubmit={this.handleSubmit}>
                   <FormGroup>
                    {/*Correction*/}
                    <Label for="exampleEmail" md={12}>Correction</Label>
                    <Col md={{ size: 12, order: 1, offset: -1 }}>
                      <Input valid={this.state.correctionIsSet} invalid={!this.state.correctionIsSet}
                        type="textarea"
                        id="selectAgence"
                        name="selectbasic"
                        value={this.state.correction}
                        onChange={e => {
                          this.setState({ correction: e.target.value })
                          if (e.target.value !== null && e.target.value !== "") {
                            this.setState({ correctionIsSet: true })
                          }
                          else { this.setState({ correctionIsSet: false }) }
                        }}>
                      </Input>
                      <FormText hidden={this.state.correctionIsSet}>Renseigner la correction</FormText>
                    </Col>
                    <Row>&nbsp;</Row>
                    {/*Cause*/}
                    <Label for="exampleEmail" md={12}>Cause</Label>
                    <Col md={{ size: 12, order: 1, offset: -1 }}>
                      <Input valid={this.state.causeIsSet} invalid={!this.state.causeIsSet}
                        type="textarea"
                        id="selectAgence"
                        name="selectbasic"
                        value={this.state.cause}
                        onChange={e => {
                          this.setState({ cause: e.target.value })
                          if (e.target.value !== null && e.target.value !== "") {
                            this.setState({ causeIsSet: true })
                          }
                          else { this.setState({ causeIsSet: false }) }
                        }}>
                      </Input>
                      <FormText hidden={this.state.causeIsSet}>Renseigner la cause</FormText>
                    </Col>
                    <Row>&nbsp;</Row>
                    {/*Actions correctives*/}
                    <Label for="exampleEmail" md={12}>Actions correctives</Label>
                    <Col md={{ size: 12, order: 1, offset: -1 }}>
                      <Input valid={this.state.actionCorrectiveIsSet} invalid={!this.state.actionCorrectiveIsSet}
                        type="textarea"
                        id="selectAgence"
                        name="selectbasic"
                        value={this.state.actionCorrective}
                        onChange={e => {
                          this.setState({ actionCorrective: e.target.value })
                          if (e.target.value !== null && e.target.value !== "") {
                            this.setState({ actionCorrectiveIsSet: true })
                          }
                          else { this.setState({ actionCorrectiveIsSet: false }) }
                        }}>
                      </Input>
                      <FormText hidden={this.state.actionCorrectiveIsSet}>Renseigner les actions correctives</FormText>
                    </Col>
                    <Row>&nbsp;</Row>
                    {/*Echéances*/}
                    <Label for="exampleEmail" md={12}>Echéances</Label>
                    <Col md={{ size: 12, order: 1, offset: -1 }}>
                      <Input valid={this.state.echeanceIsSet} invalid={!this.state.echeanceIsSet}
                        type="date"
                        id="selectAgence"
                        min={this.currentDate()}
                        name="selectbasic"
                        value={this.state.echeance}
                        onChange={e => {
                            {
                              e.preventDefault();
                              {this.setState({ echeance: e.target.value })
                              if (e.target.value !== null && e.target.value !== "") {
                                this.setState({ echeanceIsSet: true })
                              }
                              else { this.setState({ echeanceIsSet: false }) }
                            }}
                        }}>
                      </Input>
                      <FormText hidden={this.state.echeanceIsSet}>Renseigner l'écheances</FormText>
                    </Col>
                    <Row>&nbsp;</Row>
                  </FormGroup>
                  </Form>
                </TabPanel>
                {/*TODO ETAPE 3 AJOUTER UN ACTEUR TRAITANT */}
                <TabPanel whenActive={3}>
                  {/* CHOIX DE L'ACTEUR TRAITANT*/}
                  <h2 style={{ textAlign: "center" }}>Choix de l'acteur traitant</h2>
                  <Form >
                   <FormGroup>
                   <Label for="acteurName" md={12}>Acteur traitant :</Label>
                   <Col md={{ size: 12, order: 1, offset: -1 }}>
                    <Input  name="acteurName" value={this.state.acteurTraitant} disabled={true}></Input> 
                    </Col>
                   </FormGroup>
                   </Form >
                    <br/>
                    <br/>
                    <strong>Selectionner un acteur traitant dans la liste ci-dessous :</strong>
                    <ReactTableActeur
                    filterable={true}
                    loading={!this.state.isLoaded}
                    minRows={5}
                    noDataText={(this.state.hasError) ? "Erreur lors de la recuperation des données,contactez les administrateur!" : "Aucune fiche à valider"}
                    data={dataActeur}
                    columns={ActeurColumns}
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
                              this.setState({
                                selectedActeur: rowInfo.index,
                                getRow: rowInfo,
                                // numeroId: rowInfo.original.numeroId,
                                //idFnc: rowInfo.original.idFnc,
                                acteurTraitant: rowInfo.original.nomPrenom
                              });
                              console.log(rowInfo.original);
                            }
                          },
                          style: {
                            background: rowInfo.index === this.state.selectedActeur ? '#cd511f' : 'white',
                            color: rowInfo.index === this.state.selectedActeur ? 'white' : 'black'
                          }
                        }
                      } else {
                        return {}
                      }
                    }} />
                </TabPanel>
                
                
                {/*TODO ETAPE 3 RECAPITULATIF ANALYSE
                DISPOSE D'UN BOUTTON POUR REVENIR AU FORMULAIRE DE L'ETAPE 2
                */}

                <TabPanel whenActive={4}>
                  {/* RENSEIGNEMENT DU FORMULAIRE 1 */}
                  <h1 style={{ textAlign: "center" }}>3</h1>


                  <ReactTableActeur
                    filterable={true}
                    loading={!this.state.isLoaded}
                    minRows={5}
                    noDataText={(this.state.hasError) ? "Erreur lors de la recuperation des données,contactez les administrateur!" : "Aucune fiche à valider"}
                    data={this.state.dataStruc}
                    columns={analyseColum}
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
                              this.setState({
                                //PAY ATTENTION 
                                selectedActeur: rowInfo.index,
                                getRow: rowInfo,
                                acteurTraitant: rowInfo.original.nomPrenom
                              });
                              console.log(rowInfo.original);
                            }
                          },
                          style: {
                            background: rowInfo.index === this.state.selectedActeur ? '#cd511f' : 'white',
                            color: rowInfo.index === this.state.selectedActeur ? 'white' : 'black'
                          }
                        }
                      } else {
                        return {}
                      }
                    }} />

        



                </TabPanel>
                
                
                {/* Cette section permet de positionner 
                    les bouttons "suivant" et "precedent" 
                    et de le  masquer au besoin 
                */}
                <Row noGutters="true" >
                  <TabPanel whenActive={1}>
                    <Col md="10" ></Col>
                    <Tab id="1" maxStep={3} step="next">
                      <Button>{'Suivant >>'}</Button>
                    </Tab>
                  </TabPanel>
                  <TabPanel whenActive={2}>
                    <Tab id="2" maxStep={3} step="prev" >
                      <Button>{'<< Précedent'}</Button>
                    </Tab>
                    <Col md="8" ></Col>
                    <Tab id="2" maxStep={3} step="next">
                      <Button>{'Suivant >> '}&nbsp;</Button>
                    </Tab>
                  </TabPanel>
                  <TabPanel whenActive={3}>
                    <Tab id="1" maxStep={3} step="prev" >
                      <Button>{'<< Précedent'}</Button>
                    </Tab>
                    <Col md="8" ></Col>
                    <Tab id="3" maxStep={4} step="next">
                      <Button type="button" onClick={this.createAnalyse} color="danger">{'Creer l\'analyse'}</Button>
                    </Tab>
                  </TabPanel>
                  <TabPanel whenActive={4}>
                    <Tab id="1" maxStep={3} step="prev" >
                      <Button>{'<< Précedent'}</Button>
                    </Tab>
                    <Col md="8" ></Col>
                    <Tab id="4" maxStep={4} step="next">
                      <Button>{'Suivant >> '}&nbsp;</Button>
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