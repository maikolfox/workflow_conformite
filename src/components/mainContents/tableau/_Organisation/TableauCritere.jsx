import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPen, faPlusCircle, faBan, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { Table } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
//import Loader from 'react-loader-spinner'
import ReactTable from 'react-table';
import ReactTableActeur from 'react-table';

import "react-table/react-table.css";
//import MediaAsset from '../../../assets/MediaAsset'
//import CorrectionRoutageModal from "../modals/CorrectionRoutageModal";
import TabSwitcher, { Tab, TabPanel } from "./TabSwitcher/TabSwitcher";
//import Authorization from '../../Authorization_401';
// import ActeurList from '../../../assets/ActeurData';
// import ActeurColumns from '../../../assets/ActeurColumns';
import Columns from '../../../assets/ColumDetailsFnc';
import CritereItem from './critereItem';
import '../tableau.css';
import SelectComp from 'react-select';
import ActeurListSelect from '../../../assets/ActeurDataSelectList';
import Auth from "../../../assets/Auth"
import DisplayNomPrenom from '../../../assets/displayNomPrenom' ;
import DateFormatTransform from '../../../assets/dateFormatTransform' ;

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
  Row,
  Col,
  Collapse,
  // Progress,
  Container
} from "reactstrap";


export default class TableauCritere extends React.Component {

  constructor(props) {
    super(props);
    this.state =
      {
        idFnc: '',
        numeroId: '',
        modal: '',

        selected: null,
        selectedActeur: null,
        selectedAnalyse: null,
        selectedAnalyseIndex: null,

        responseToPost: [],
        responseToAnalyseByID: [],
        isLoaded: '',
        getRow: '',
        idSource: '',
        idFamile: '',
        idProcessus: '',
        descriptionFnc: '',
        qualification: '',

        libelleSource: '',
        libelleFamile: '',
        libelleProcessus: '',


        correction: '',
        correctionIsSet: '',

        actionCorrective: '',
        actionCorrectiveIsSet: '',

        cause: '',
        causeIsSet: '',

        libelle: 1,

        idActeur: null,
        acteurTraitant: null,
        idActeurIsSet: false,

        nomPrenom: '',
        echeance: '',
        echeanceIsSet: false,
        isLoadedAna: false,
        hasError: '',
        errorMessage: '',
        responseSubmit: '',

        dataStruc: [],
        dsFncNbrAna: [],
        //selectedAnalyseIndex:null,
        //selectedAnalyse: null,

        critereIsSet: false,

        selectedAnaCreIndex: null,
        selectedAnaCre: null,
        collapse: false,
        collapseDetail: false,

        criterObject: [],
        critere: "",
        echeanceCritere: "",
        echeanceCritereIsSet: false,
        id: null,
        unAutorize: false
      }
    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.currentDate = this.currentDate.bind(this);
    this.handleModifyAnalyse = this.handleModifyAnalyse.bind(this);
    this.handleValidModifyAnalyse = this.handleValidModifyAnalyse.bind(this);
    this.newAnalyse = this.newAnalyse.bind(this);
    this.getAnalyse = this.getAnalyse.bind(this);
    this.switchDateFormat = this.switchDateFormat.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.toggleCollapseDetail = this.toggleCollapseDetail.bind(this);
    this.consultFncInitier = this.consultFncInitier.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSelectComp=this.handleSelectComp.bind(this);
  };

  handleSelectComp=selectOption=>
  {
    console.log(selectOption.value)
    this.setState({idActeur:selectOption.value,idActeurIsSet:true})
  }


  handleAdd() {
    const obj = {
      id: Date.now(),
      echeance: this.state.echeanceCritere,
      critere: this.state.critere
    };
    const auxTodo = this.state.criterObject;
    this.setState({
      criterObject: auxTodo.concat(obj),
      critere: "",
      echeanceCritere: "",
      critereIsSet: false,
      echeanceCritereIsSet: false
    });
    console.log(this.state.criterObject);
  }

  handleChange = id => {
    this.setState(prevState => {
      const update = prevState.criterObject.map(elem => {
        if (elem.id === id) {
          elem.completed = !elem.completed;
        }
        return elem;
      });
      return {
        criterObject: update
      };
    });
    console.log(id);
  };

  handleDelete = id => {
    var update = [];
    console.log("id", id);
    this.setState(prevState => {
      prevState.criterObject.map(elem => {
        if (elem.id !== id) {
          update.push(elem);
        }
      });
      return {
        criterObject: update
      };
    });
    console.log(this.state.criterObject);
  }


  toggleCollapse() {
    this.setState(state => ({ collapse: !state.collapse }));
  }
  toggleCollapseDetail() {
    this.setState(state => ({ collapseDetail: !state.collapseDetail }));
  }

 


  currentDate() { //January is 0!
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today;
  }

  handleSubmit = async e => {
    e.preventDefault();
    console.log(this.state.dataStruc);
    await fetch('/createCriter/fnc',
      {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "data": {
            "acteurOrga":Auth.getUsername(),
            "mainData": {
              "idAt": this.state.selectedAnaCre.id,
              "critereObjet": this.state.criterObject
            },
            "notifData": {
              "idActeur": this.state.idActeur,
              "idResponsableTraitement": this.state.nomPrenom,
              "numeroId": this.state.numeroId
            }
          }
        })
      }).then(res => res.json())
      .then(
        (result) => {

          this.setState(prevState => ({
            responseToPost: prevState.responseToPost.filter(item => {
              return item.idFnc !== this.state.idFnc;
            })
          }))
          this.setState({
            isLoaded: true,
            responseSubmit: result.data.message,
            nestedModal: true,
            criterObject: []
          });
          this.toggle();
          this.consultFncInitier();
        },
        (error) => {
          console.log("124", error.message);
          alert("Erreur lors de la communication avec le serveur , contacter les administrateurs si le problème persiste");
          this.setState({
            isLoaded: true,
            errorMessage: error.message,
            hasError: true,
            criterObject: []

          });

        });

  }

  handleModifyAnalyse = itemId => {
    const updatedItems = this.state.dataStruc.map(item => {
      if (itemId === item.libelleAnalyse) {
        this.setState({
          cause: item.cause,
          correction: item.correction,
          echeance: item.echeance,
          acteurTraitant: null,
          idActeur: null,
          libelleAnalyse: item.libelleAt,
          actionCorrective: item.actionCorrective
        })
        console.log(item.cause);
      }
      return item;
    });

    this.setState({
     // dataStruc: [].concat(updatedItems),
      selectedAnalyseIndex: null,
      selectedActeur: null
    });
  };

  handleValidModifyAnalyse = itemId => {
    const updatedItems = this.state.dataStruc.map(item => {
      if (itemId === item.libelleAt) {

        this.setState({
          cause: item.cause,
          correction: item.correction,
          echeance: item.echeance,
          acteurTraitant: null,
          idActeur: null,
          libelleAnalyse: item.libelleAt,
          actionCorrective: item.actionCorrective
        })
        console.log(item.cause);
        item.actionCorrective = this.state.actionCorrective;
        item.correction = this.state.correction;
        item.echeance = this.state.echeance;
        item.cause = this.state.cause;
        //TODO RECUPERER LA VALEUR DANS LA SESSION
        item.idActeurDelegataire = 'ahoueromeo@gmail.com';
        item.idActeur = this.state.idActeur;
        item.libelleAnalyse = itemId;
      };
      return item;
    });
    
    this.setState(prevState => ({
      dataStruc: prevState.dataStruc.map(el => (el.libelleAt !== updatedItems.libelleAt ? { ...el } : updatedItems))
    }));
    fetch('/updateTraitement/fnc',
      {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "data":
          {
            "id": this.state.selectedAnaCre.id,
            "idActeur": this.state.idActeur,
            "actionCorrective": this.state.actionCorrective,
            "correction": this.state.correction,
            "cause": this.state.cause,
            "echeances": this.state.echeance,
            //TODO REPLACE LATER
            "idActeurDelegataire": "maikol.ahoue@bridgebankgroup.com"
          }
        })
      }).then(res => res.json())
      .then(
        (result) => {
          console.log(this.state.selected);
          this.setState({
            isLoaded: true,
            responseSubmit: result.data.message,
            nestedModal: true,
          });
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
    //this.toggle();
  }


  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal
    });
  }

  getAnalyse = idFnc => {
    fetch('/consultationAnalyseById/fnc',
      {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "data": {
            "idFnc": idFnc
          }
        })
      })
      .then(res => res.json())
      .then(
        (result) => {
          if (result.data.error === true || result.data.message === "Accès refuser !" || result.data.responses === null) {
            alert(result.data.message);
            window.close();

            this.setState({
              isLoadedAna: true,
              errorMessage: "Accès refuser !",
              hasError: false,
              unAutorize: true
            });
          }
          else {
            console.log("RESULT RESPONSE ",result.data.responses)
            console.log("resp data")
            result.data.responses.map(el=>{
              el.idActeurFormat= DisplayNomPrenom(el.idActeur);
              el.idActeurDelegataireFormat= DisplayNomPrenom(el.idActeurDelegataire);
              el.echeancesFormat=DateFormatTransform(el.echeances);
              el.dateCreationAnalyseFormat=DateFormatTransform(el.dateCreationAnalyse);
            })
            this.setState({
              isLoadedAna: true,
              responseToAnalyseByID: result.data.responses
            });
            var obje = {
              id: idFnc,
              value: this.state.responseToAnalyseByID.length,
            }
            console.log(obje);
            if (this.state.dsFncNbrAna.length === 0) { this.setState(prevState => ({ dsFncNbrAna: prevState.dsFncNbrAna.concat(obje) })); }
            else
              this.setState(prevState => ({ dsFncNbrAna: prevState.dsFncNbrAna.map(el => (el.id === obje.id ? obje : { ...el })) }));
            // console.log(this.state.responseToAnalyseByID)
            console.log(this.state.dsFncNbrAna)
          }
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
  newAnalyse() {
    this.setState({
      correction: null,
      correctionIsSet: false,
      actionCorrective: null,
      actionCorrectiveIsSet: false,
      cause: null,
      causeIsSet: false,
      idActeur: null,
      acteurTraitant: null,
      idActeurIsSet: false,
      echeance: null,
      echeanceIsSet: false,
      critere: null,
      critereIsSet: false
    })

  }

  switchDateFormat = dat => {
    var d = new Date(dat);
    var month = d.getMonth() + 1;
    console.log(month);
    var year = d.getFullYear();
    var date = d.getDate();
    month = (month < 10) ? "0" + month : month;
    date = (date < 10) ? "0" + date : date;
    console.log("date ech  " + date + "/" + month + "/" + year);
    return date + "/" + month + "/" + year;

  }



  toggle() {
    this.setState({ valRoutage: null })
    this.setState(prevState => ({
      modal: !prevState.modal,
      selected: !prevState.selected,
      //add this and  init at null others selected*
      selectedAnalyse: !prevState.selectedAnalyse
    }));
    this.newAnalyse();
    this.setState({ libelle: 1 });
    this.setState({ dataStruc: [] });
    this.setState({ selectedAnaCreIndex: null })

  }

  async consultFncInitier()
  {
    await fetch("/consultationFncInitier/fnc")
      .then(res => res.json())
      .then(
        (result) => {
          if (result.data.error === true || result.data.message === "Accès refuser !" || result.data.responses === null) {
            alert(result.data.message);
            window.close();
            this.setState({
              isLoaded: true,
              errorMessage: result.data.message,
              hasError: false,
              unAutorize: true
            });
          }
          else {
            
            this.setState({
              isLoaded: true,
              responseToPost: result.data.responses
            });
            console.log(this.state.responseToPost)
            if (this.props.match.params.idFnc !== undefined) {
              console.log("-------->from idfnc query param", this.props.match.params.idFnc)
              const fiche = this.state.responseToPost.find(el => el.numeroId === this.props.match.params.idFnc)
              if (fiche !== undefined) {
                this.getAnalyse(fiche.idFnc)
                this.toggle()
                }else{alert("La réference suivante est incorrecte ou celle-ci n'est plus disponible dans cette section : "+ this.props.match.params.idFnc)}
            }
          }
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
  async componentDidMount() {
    this.consultFncInitier()
  }


  render() {


    ///LIBRARY//////////////////////////////////////////////
    library.add(faPen, faBan, faTrash, faPlusCircle, faEye);
    ////////////////////////////////////////////////////////

    const criterObjDisplay = this.state.criterObject.map(item => (
      <CritereItem
        key={item.id}
        item={item}
        onChange={this.handleChange}
        deleteTodo={this.handleDelete}
      />
    ));



    const contentConsult = <React.Fragment>
      <h4 style={{ textAlign: "center" }}>CONSULTATION ANALYSE</h4>
      {/*Correction*/}
      <Label for="exampleEmail" md={12}>Correction</Label>
      <Col md={{ size: 12, order: 1, offset: -1 }}>
        <Input
          type="textarea"
          disabled={true}
          id="selectAgence"
          name="selectbasic"
          value={this.state.correction}>
        </Input>
      </Col>
      <Row>&nbsp;</Row>
      {/*Cause*/}
      <Label for="exampleEmail" md={12}>Cause</Label>
      <Col md={{ size: 12, order: 1, offset: -1 }}>
        <Input
          type="textarea"
          id="selectAgence"
          disabled={true}
          name="selectbasic"
          value={this.state.cause}>
        </Input>
      </Col>
      <Row>&nbsp;</Row>
      {/*Actions correctives*/}
      <Label for="exampleEmail" md={12}>Actions correctives</Label>
      <Col md={{ size: 12, order: 1, offset: -1 }}>
        <Input
          type="textarea"
          id="selectAgence"
          disabled={true}
          name="selectbasic"
          value={this.state.actionCorrective}>
        </Input>
      </Col>
      <Row>&nbsp;</Row>
      {/*Echéances*/}
      <Label for="exampleEmail" md={12}>Echéances</Label>
      <Col md={{ size: 12, order: 1, offset: -1 }}>
        <Input
          type="date"
          id="selectAgence"
          disabled={true}
          name="selectbasic"
          value={this.state.echeance}
        >
        </Input>
      </Col>
      <Row>&nbsp;</Row>
      {/* CHOIX DE L'ACTEUR TRAITANT*/}
      <Label for="acteurName" md={12}>Acteur traitant :</Label>
      <Col md={{ size: 12, order: 1, offset: -1 }}>
        <Input name="acteurName" value={this.state.nomPrenom} disabled={true}></Input>
      </Col>
    </React.Fragment>

    const contentConsultDetailfnc = <React.Fragment>
      <h4 style={{ textAlign: "center" }}>CONSULTATION DETAILS FNC</h4>
      {/*Qualification*/}
      <Label for="exampleEmail" md={12}>Qualification</Label>
      <Col md={{ size: 12, order: 1, offset: -1 }}>
        <Input
          type="text"
          disabled={true}
          id="selectAgence"
          name="selectbasic"
          value={this.state.qualification}>
        </Input>
      </Col>
      <Row>&nbsp;</Row>
      {/*Processus*/}
      <Label for="exampleEmail" md={12}>Processus</Label>
      <Col md={{ size: 12, order: 1, offset: -1 }}>
        <Input
          type="text"
          id="selectAgence"
          disabled={true}
          name="selectbasic"
          value={this.state.libelleProcessus}>
        </Input>
      </Col>
      <Row>&nbsp;</Row>
      {/*Processus*/}
      <Label for="exampleEmail" md={12}>Famille</Label>
      <Col md={{ size: 12, order: 1, offset: -1 }}>
        <Input
          type="text"
          id="selectAgence"
          disabled={true}
          name="selectbasic"
          value={this.state.libelleFamile}>
        </Input>
      </Col>
      <Row>&nbsp;</Row>
      {/*Source*/}
      <Label for="exampleEmail" md={12}>Source</Label>
      <Col md={{ size: 12, order: 1, offset: -1 }}>
        <Input
          type="text"
          id="selectAgence"
          disabled={true}
          name="selectbasic"
          value={this.state.libelleSource}
        >
        </Input>
      </Col>
      <Label for="exampleEmail" md={12}>Description</Label>
      <Col md={{ size: 12, order: 1, offset: -1 }}>
        <Input
          min={3}
          type="textarea"
          id="selectAgence"
          disabled={true}
          name="selectbasic"
          value={this.state.descriptionFnc}>
        </Input>
      </Col>
    </React.Fragment>



    const consultationAnalyse_fnc = <React.Fragment>
      <Form>
        <FormGroup >
          <Row md={12}>
            <Col md={6}>
              <Button onClick={this.toggleCollapse} outline color="secondary">
                <FontAwesomeIcon
                  icon="eye"
                  color="black"
                  size="md"
                />{' Details de l\'analyse'}
              </Button>
              <Collapse className="boderStyle" isOpen={this.state.collapse}>
                {contentConsult}
              </Collapse>
            </Col>
            <Col md={6}>
              <Button size={25} onClick={this.toggleCollapseDetail} outline color="secondary">
                <FontAwesomeIcon
                  icon="eye"
                  color="black"
                  size="md"
                />{' Details de la FNC'}
              </Button>
              <Collapse className="bloc" isOpen={this.state.collapseDetail}>
                {contentConsultDetailfnc}
              </Collapse>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </React.Fragment>


    const analyseRetrieveColum = [

      {
        Header: 'N° Analyse',
        accessor: 'libelleAt',
        width: 90

      },
      {
        Header: 'Email de l\'Acteur traitant',
        accessor: 'idActeurFormat',
      },

      {
        Header: 'Email du Responsable de traitement',
        accessor: 'idActeurDelegataireFormat',

      },
      {
        Header: 'Date de création',
        accessor: 'dateCreationAnalyseFormat',
      },
      {
        Header: 'Echeances',
        accessor: 'echeancesFormat',
      }


    ]






    // if(this.state.unAutorize)
    // {
    //     return(<Authorization/>) 
    // }
    //else
    return (
      <React.Fragment>
        {/*REACT  MODAL FORM*/}
        <div>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
            size="lg"
            style={{ maxWidth: '1600px', width: '65%' }}
            centered
            aria-labelledby="example-modal-sizes-title-lg"
            backdrop="static"
          >
            <ModalHeader toggle={this.toggle}>Consultation des analyses / Creation de critères </ModalHeader>
            <ModalBody>
              <TabSwitcher>
                {/* ETAPE 1 RECAPITULATIF DES INFOS DE LA FICHE  */}
                <TabPanel whenActive={1}>
                  <br></br>
                  <h1 style={{ textAlign: "center" }}>Analyse(s) crée(s) pour la fiche {this.state.numeroId}</h1>
                  <Col>
                      <small textAlign="center">
                      Selectionner une analyse creer un critère et soummettez une fois que 
                      la création est Terminée <br></br>Vous pouvez consulter les details de l'analyse
                      </small>
                  </Col>
                  <br></br>
                  <ReactTableActeur
                    filterable={true}
                    className="-striped -highlight"
                    style={{ cursor: 'pointer' }}
                    loading={!this.state.isLoadedAna}
                    minRows={5}
                    noDataText={(this.state.hasError) ? "Erreur lors de la recuperation des données,contactez les administrateur!" : "Aucune fiche à valider"}
                    data={this.state.responseToAnalyseByID}
                    columns={analyseRetrieveColum}
                    previousText={"Précédent"}
                    nextText={"Suivant"}
                    rowsText={"Ligne(s)"}
                    ofText={"sur "}
                    loadingText="Chargement en cours..."
                    getTrProps={(state, rowInfo) => {
                      if (rowInfo && rowInfo.row) {
                        return {
                          onClick: (e) => {
                            e.preventDefault();
                            // var idFnc;
                            // var  nbrAna;
                            this.setState({
                              //PAY ATTENTION 
                              selectedAnaCreIndex: rowInfo.index,
                              selectedAnaCre: rowInfo.original,
                              getRow: rowInfo,
                              acteurTraitant: rowInfo.original.nomPrenom,
                              idActeur: rowInfo.original.idActeur,
                              correction: rowInfo.original.correction,
                              actionCorrective: rowInfo.original.actionCorrective,
                              echeance: rowInfo.original.echeances,
                              cause: rowInfo.original.cause,
                              nomPrenom: rowInfo.original.idActeur
                            });
                            console.log(rowInfo.original);
                          },
                          style: {
                            background: rowInfo.index === this.state.selectedAnaCreIndex ? '#cd511f' : 'white',
                            color: rowInfo.index === this.state.selectedAnaCreIndex ? 'white' : 'black'
                          }
                        }
                      } else {
                        return {}
                      }
                    }} />
                  <br></br>
                  {/**BUTTON MODIFIER ET SUPPRIMER */}
                  <TabPanel whenActive={1}>
                    <Container>
                      <Row>
                        {/**BUTTON VOIR  */}
                        <Col md="3">
                          <Tab id="10" maxStep={3} step={(this.state.selectedAnaCreIndex === null) ? "nope" : 11}>
                            <Button disabled={(this.state.selectedAnaCreIndex === null)} outline color="secondary">
                              <FontAwesomeIcon
                                icon="eye"
                                color="black"
                                size="md"
                              />{' Voir l\'analyse'}
                            </Button>
                          </Tab>
                        </Col>
                        {/**BUTTON MODIFIER */}
                        <Col md="3">
                          <Tab id="10" maxStep={3} step={(this.state.selectedAnaCreIndex === null) ? "nope" : "extends"}>
                            <Button outline color="primary" disabled={(this.state.selectedAnaCreIndex === null)} onClick={e => {
                              e.preventDefault();
                              this.setState({ idActeur: null, idActeurIsSet: null })
                              this.handleModifyAnalyse(this.state.selectedAnaCreIndex.libelleAt);
                              console.log(this.state.selectedAnaCreIndex.libelleAt)
                            }}>
                              <FontAwesomeIcon
                                icon="pen"
                                color="#87CEFA"
                                size="md"
                              />{' Modifier l\'analyse'}
                            </Button>
                          </Tab>
                        </Col>
                        {/**BUTTON SUPPRIMER  */}
                        {/* <Col md="3">
                          <Tab id="10" maxStep={3} step={(this.state.selectedAnaCreIndex === null) ? "nope" : "extends"}>
                            <Button disabled={(this.state.selectedAnaCreIndex === null)} outline color="danger">
                              <FontAwesomeIcon
                                icon="trash"
                                color="#FFB6C1"
                                size="md"
                              />{' Supprimer l\'analyse'}
                            </Button>
                          </Tab>
                        </Col> */}
                      </Row>
                    </Container>
                  </TabPanel>
                </TabPanel>
                {/* ETAPE MODIFICATION ANALYSE*/}
                <TabPanel whenActive={10}>
                  {/* MODIFICATION ANALYSE */}
                  <h1 style={{ textAlign: "center" }}>MODIFICATION ANALYSE</h1>
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
                            e.preventDefault();
                            this.setState({ echeance: e.target.value })
                            if (e.target.value !== null && e.target.value !== "") {
                              this.setState({ echeanceIsSet: true })
                            }
                            else { this.setState({ echeanceIsSet: false }) }
                          }}>
                        </Input>
                        <FormText hidden={this.state.echeanceIsSet}>Renseigner l'écheance</FormText>
                      </Col>
                      <Row>&nbsp;</Row>
                      {/* CHOIX DE L'ACTEUR TRAITANT*/}
                      <Label for="acteurName" md={12}>Choix de l'acteur traitant</Label>
                      <Col md={12}>
                        <SelectComp onChange={this.handleSelectComp} options={ActeurListSelect} />
                        <FormText hidden={this.state.idActeurIsSet}>Choisissez un acteur</FormText>
                      </Col>
                    </FormGroup>
                  </Form >
                  <br />
                  <Row>
                    <Tab id="1" maxStep={3} step={1}>
                      <Button>Annuler</Button>
                    </Tab>
                    <Col md="8" ></Col>
                    <Tab id="1" maxStep={3} step={1}>
                      <Button disabled={!(this.state.idActeurIsSet && this.state.actionCorrective && this.state.correctionIsSet && this.state.causeIsSet && this.state.echeanceIsSet)} color="danger" onClick={e => {
                        e.preventDefault();
                        this.handleValidModifyAnalyse(this.state.selectedAnalyse.libelleAt);
                      }}>Valider la modification</Button>
                    </Tab>
                  </Row>
                </TabPanel>
                <TabPanel whenActive={11}>
                  {/* CONSULTATION ANALYSE */}
                  {contentConsult}
                  <br />
                  <br></br>
                  <Row>
                    <Tab id="1" maxStep={3} step={1}>
                      <Button>Retour</Button>
                    </Tab>
                    <Col md="8" ></Col>
                  </Row>
                </TabPanel>
                <TabPanel whenActive={2}>
                  {/* CREATION CRITERE D'ANALYSE ANALYSE */}
                  <h1 style={{ textAlign: "center" }}>Création de critères</h1>
                  <br></br>
                  <div style={{
                    display: 'block',
                    marginLeft: '3%',
                    marginRight: '0%'
                  }}>
                    {consultationAnalyse_fnc}
                  </div>
                  <br></br>
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                      {/*Critère*/}
                      <Label for="exampleEmail" md={6}>Critère</Label><Label for="exampleEmail" md={6}>Critère(s) créé(s)</Label>
                      <Row>
                        <Col md={{ size: 6, order: 1, offset: 0 }}>
                          <Col md={{ size: 12, order: 1, offset: 0 }}>
                            <Input valid={this.state.critereIsSet} invalid={!this.state.critereIsSet}
                              type="textarea"
                              id="selectAgence"
                              name="selectbasic"
                              value={this.state.critere}
                              required
                              onChange={e => {
                                this.setState({ critere: e.target.value })
                                if (e.target.value !== null && e.target.value !== "") {
                                  this.setState({ critereIsSet: true })
                                }
                                else { this.setState({ critereIsSet: false }) }
                              }}>
                            </Input>
                            <FormText hidden={this.state.critereIsSet}>Renseigner le critère</FormText>
                          </Col>
                          <Row>&nbsp;</Row>
                          <Label for="exampleEmail" md={12}>Echeance</Label>
                          <Col md={{ size: 12, order: 1, offset: 0 }}>
                            <Input valid={this.state.echeanceCritereIsSet} invalid={!this.state.echeanceCritereIsSet}
                              type="date"
                              id="selectAgence"
                              name="selectbasic"
                              min={this.currentDate()}
                              value={this.state.echeanceCritere}
                              onChange={e => {
                                this.setState({ echeanceCritere: e.target.value })
                                if (e.target.value !== null && e.target.value !== "") {
                                  this.setState({ echeanceCritereIsSet: true })
                                }
                                else { this.setState({ echeanceCritereIsSet: false }) }
                              }}>
                            </Input>
                            <FormText hidden={this.state.critereIsSet}>Renseigner l'écheance</FormText>
                            <br></br>
                            <Button onClick={this.handleAdd} disabled={!(this.state.critereIsSet && this.state.echeanceCritereIsSet)}>Ajouter un critère</Button>
                          </Col>
                        </Col>
                        <Col md={{ size: 6, order: 1, offset: 0 }} >
                          {criterObjDisplay}
                        </Col>
                      </Row>
                    </FormGroup>
                  </Form >
                  <br></br>
                </TabPanel>

                {/* Cette section permet de positionner 
                    les bouttons "suivant" et "precedent" 
                    et de le  masquer au besoin 
                */}
                {/*MODIFICATION RECAPITULATIF FNC BUTTON*/}

                <Row noGutters="true" >
                  <TabPanel whenActive={1}>
                    <Col md="10" ></Col>
                    <Tab id="1" maxStep={3} step="next">
                      <Button disabled={!(this.state.selectedAnaCre !== null)}>{'Suivant >>'}&nbsp;</Button>
                    </Tab>
                  </TabPanel>
                  {/*FORMULAIRE BUTTON*/}
                  <TabPanel whenActive={2}>
                    <Tab id="2" maxStep={3} step="prev" >
                      <Button>{'<< Précédent'}</Button>
                    </Tab>
                    <Col md="10" ></Col>
                    {/* <Tab id="2" maxStep={3} step="next">
                      <Button disabled={!(this.state.actionCorrective&&this.state.correctionIsSet&&this.state.causeIsSet&&this.state.echeanceIsSet)}>{'Suivant >>'}&nbsp;</Button>
                    </Tab> */}
                  </TabPanel>
                  </Row>
              </TabSwitcher>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.handleSubmit} disabled={(this.state.criterObject.length === 0)}>
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
            noDataText={(this.state.hasError) ? "Erreur lors de la recuperation des données,contactez les administrateur!" : "Aucune fiche à valider"}
            data={this.state.responseToPost}
            columns={Columns}
            previousText={"Précédent"}
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
                      idFnc: rowInfo.original.idFnc,
                      selected: rowInfo.index,
                      getRow: rowInfo,
                      idProcessus: rowInfo.original.idProcessus,
                      numeroId: rowInfo.original.numeroId,
                      descriptionFnc: rowInfo.original.descriptionFnc,
                      libelleSource: rowInfo.original.libelleSource,
                      libelleFamile: rowInfo.original.libelleFamille,
                      libelleProcessus: rowInfo.original.libelleProcesus,
                      qualification: rowInfo.original.qualification
                    });
                    console.log(rowInfo.index);
                    this.getAnalyse(rowInfo.original.idFnc)
                  },
                  style: {
                    background: rowInfo.index === this.state.selected ? '#cd511f' : 'white',
                    color: rowInfo.index === this.state.selected ? 'white' : 'black'
                  }
                }
              } else {
                return {}
              }
            }}
            className="-striped -highlight"
            defaultPageSize={5}
          />
        </div>
      </React.Fragment>)
  }
}