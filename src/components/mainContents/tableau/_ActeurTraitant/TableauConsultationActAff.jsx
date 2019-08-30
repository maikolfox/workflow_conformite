import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { Table } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
//import Loader from 'react-loader-spinner'
import ReactTable from 'react-table';
import "react-table/react-table.css";
import MediaAsset from '../../../assets/MediaAsset'
//import CorrectionRoutageModal from "../modals/CorrectionRoutageModal";
import TabSwitcher, { Tab, TabPanel } from "./TabSwitcher/TabSwitcher";
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
  FormText,
  Label,
  Row, 
  Col,
  Progress,Container 
} from "reactstrap";


export default class ConsultationActAff extends React.Component {

  constructor(props) {
    super(props);
    this.state =
      {
        idFnc: '',
        numeroId: '',
        modal: '',
        
        selected: null,
        selectedActeur: null,
        selectedAnalyse:null,
        selectedAnalyseIndex:null,
        
        responseToPost: [],
        isLoaded: '',
        getRow: '',
        idSource: '',
        idFamile: '',
        idProcessus: '',
        descriptionFnc: '',
        qualification: '',

        correction: '',
        correctionIsSet: '',

        actionCorrective: '',
        actionCorrectiveIsSet: '',

        cause: '',
        causeIsSet: '',

        libelle: 1,

        idActeur: null,
        acteurTraitant: null,
        idActeurIsSet :false,
        
        echeance: '',
        echeanceIsSet: false,

        hasError: '',
        errorMessage: '',
        valRoutage: null,
        responseSubmit: '',

        dataStruc: [],


        unAutorize:false,
        analyseFnc:[],
      }
    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.currentDate = this.currentDate.bind(this);
    this.handleModifyAnalyse=this.handleModifyAnalyse.bind(this);
    this.handleValidModifyAnalyse= this.handleValidModifyAnalyse.bind(this);
    this.newAnalyse=this.newAnalyse.bind(this);
    ///
    this.retrieveAnaByFnc=this.retrieveAnaByFnc.bind(this);
  };


  retrieveAnaByFnc=idfnc=>
  {
   var objectToArray=[];
   // eslint-disable-next-line
   this.state.responseToPost.map(el=>{
        if(el.idFnc===idfnc){
            
            var object={
                libelleAt:el.libelleAt,
                cause:el.cause,
                actionCorrective:el.actionCorrective,
                correction:el.correction,
                echeance:el.echeances
            }
            objectToArray.push(object);
          }   
          })
    this.setState({analyseFnc:objectToArray});
  
}

  createAnalyse = event => {
    event.preventDefault();
    const newItem = {
      idFnc:this.state.idFnc,
      processus:this.state.idProcessus,
      actionCorrective: this.state.actionCorrective,
      correction: this.state.correction,
      echeance: this.state.echeance,
      cause: this.state.cause,
      /// TODO A RECUPERER DANS LA SESSION
      idActeurDelegataire: 'ahoueromeo@gmail.com',
      idActeur: this.state.idActeur,
      libelleAt:this.state.libelle
     
    };

    this.setState(prevState => ({
      dataStruc: prevState.dataStruc.concat(newItem),
      libelle:prevState.libelle +1
    }));
    console.log(this.state.dataStruc);
  };


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
      await fetch('/createTraitement/fnc',
      {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "data": this.state.dataStruc
        })
      }).then(res => res.json())
      .then(
        (result) => {
          this.setState(prevState => ({
            responseToPost: prevState.responseToPost.filter(item => {
              return item.idFnc !== this.state.idFnc;
            })
          }))
          console.log(this.state.selected);
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
    this.toggle();
  }

  handleModifyAnalyse = itemId => {
    const updatedItems = this.state.dataStruc.map(item => {
      if (itemId === item.libelleAnalyse) {
        this.setState({cause: item.cause,
                      correction :item.correction,
                      echeance:item.echeance, 
                      acteurTraitant:null,
                      idActeur:null,
                      libelleAnalyse:item.libelleAt,
                      actionCorrective:item.actionCorrective   
                    })       
      console.log(item.cause);
      }
      return item;
    });

    this.setState({
      dataStruc: [].concat(updatedItems),
      selectedAnalyseIndex:null,
      selectedActeur:null
    });
  };

  handleValidModifyAnalyse =itemId=>{
    const updatedItems = this.state.dataStruc.map(item => {
      if (itemId === item.libelleAt) {

        this.setState({
          cause: item.cause, 
          correction :item.correction ,
          echeance:item.echeance, 
          acteurTraitant:null,
          idActeur:null,
          libelleAnalyse:item.libelleAt,
          actionCorrective:item.actionCorrective
        })       
      console.log(item.cause);
        item.idFnc=this.state.idFnc;
        item.processus=this.state.idProcessus;
        item.actionCorrective= this.state.actionCorrective;
        item.correction= this.state.correction;
        item.echeance= this.state.echeance;
        item.cause= this.state.cause;
        //TODO RECUPERER LA VALEUR DANS LA SESSION
        item.idActeurDelegataire= 'ahoueromeo@gmail.com';
        item.idActeur= this.state.idActeur;
        item.libelleAnalyse=itemId;
      };
    
      return item;
    });
    this.setState(prevState=>({
      dataStruc:prevState.dataStruc.map(el=>( el.libelleAt !== updatedItems.libelleAt  ? {...el} : updatedItems))   
    }));
  }


  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal
    });
  }

 newAnalyse(){
    this.setState({
      correction: null,
      correctionIsSet: false,
      actionCorrective: null,
      actionCorrectiveIsSet: false,
      cause: null,
      causeIsSet: false,
      idActeur: null,
      acteurTraitant: null,
      idActeurIsSet :false,    
      echeance: null,
      echeanceIsSet: false
      })

  }

  toggle() {
    this.setState({ valRoutage: null })
    this.setState(prevState => ({
      modal: !prevState.modal,
      selected: !prevState.selected,
      //add this and  init at null others selected*
      selectedAnalyse:!prevState.selectedAnalyse
    }));
    this.newAnalyse();
    this.setState({libelle:1});
    this.setState({dataStruc:[]})
  }
  async componentDidMount() {
     await fetch("/consultActionAff/fnc",
      {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "data":
          {
            
            /*TODO A RECUPERER DANS LA SESSION*/
            "idResponsable": "ahoueromeo@gmail.com",
            "idProfil": [
              { "idProfil": 1 }
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
              //filter array and remove doublon
            var responseArray=result.data.responses;
            var cache = {};
            responseArray = responseArray.filter(function(elem,index,array){
                return cache[elem.idFnc]?0:cache[elem.idFnc]=1;
            });
          this.setState({
            isLoaded: true,
            responseArray:responseArray,//filtering array wil be display in react-tab
            responseToPost: result.data.responses // is use to aggragate
          });
          console.log(this.state.responseToPost)}
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
        accessor: 'idActeur',
      },

    ]

    const analyseColum = [

      {
        Header: 'N° de l\'analyse',
        accessor: 'libelleAt',
      },

      {
        Header: 'echeance',
        accessor: 'echeance',
      },

    ]
    //MISE EN FORM DU JSON POUR LES ACTEURS
    const dataActeur = [
      {
        nomPrenom: 'Ahoue romeo',
        fonction: 'Developper web',
        service: 'IT',
        idActeur: 'ahoueromeo@gmail.com'
      },
      {
        nomPrenom: 'Ahoue Maikol',
        fonction: 'Analyste programmeur',
        service: 'RH',
        idActeur: 'maikol.ahoue@bridgebankgroup.com'
      }

    ];

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
                  <MediaAsset libelle="Description de la non conformite" content={this.state.descriptionFnc} />
                  {/**SOURCE*/}
                  <MediaAsset libelle="Source" content={this.state.source} />
                  {/**PROCESSUS*/}
                  <MediaAsset libelle="Processus" content={this.state.idProcessus} />
                  {/*FAMILLE*/}
                  <MediaAsset libelle="Famille" content={this.state.idFamile} />
                </TabPanel>
                {/* ETAPE 2 FORMULAIRE ANALYSE */}

                <TabPanel whenActive={2}>
                <ReactTable
                    filterable={true}
                    loading={!this.state.isLoaded}
                    minRows={5}
                    noDataText={(this.state.hasError) ? "Erreur lors de la recuperation des données,contactez les administrateur!" : "Aucune fiche à valider"}
                    data={this.state.analyseFnc}
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
                              e.preventDefault();
                              this.setState({
                                //PAY ATTENTION 
                                selectedAnalyseIndex: rowInfo.index,
                                selectedAnalyse: rowInfo.original,
                                getRow: rowInfo,
                                acteurTraitant: rowInfo.original.nomPrenom,
                                idActeur:rowInfo.original.idActeur,
                              });
                              console.log(rowInfo.original);
                          },
                          style: {
                            background: rowInfo.index === this.state.selectedAnalyseIndex ? '#cd511f' : 'white',
                            color: rowInfo.index === this.state.selectedAnalyseIndex ? 'white' : 'black'
                          }
                        }
                      } else {
                        return {}
                      }
                    }} />
                    <br/>
                    d kkfd k
                </TabPanel>

                {/*TODO ETAPE 4 RECAPITULATIF ANALYSE
                DISPOSE D'UN BOUTTON POUR REVENIR AU FORMULAIRE DE L'ETAPE 2
                */}
                <TabPanel whenActive={4}>
                <h4>Progression :</h4>
                      <Progress animated color="danger" value="90" />
                      <br></br>
                      <h1 style={{ textAlign: "center" }}>Analyse(s) crée(s)</h1>
                      <Col>
                        <small>
                        Vous pouvez modifier une analyse , la supprimer ou creer une nouvelle avant de soumettre.<br/>
                        La soumission termine la phase d'analyse aucune modification ne seras possible sans l'accord 
                        de l'Organisation ou DRCJ
                        </small>
                      </Col>
                      <ReactTable
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
                              e.preventDefault();
                              this.setState({
                                //PAY ATTENTION 
                                selectedAnalyseIndex: rowInfo.index,
                                selectedAnalyse: rowInfo.original,
                                getRow: rowInfo,
                                acteurTraitant: rowInfo.original.nomPrenom,
                                idActeur:rowInfo.original.idActeur,
                              });
                              console.log(rowInfo.original);
                          },
                          style: {
                            background: rowInfo.index === this.state.selectedAnalyseIndex ? '#cd511f' : 'white',
                            color: rowInfo.index === this.state.selectedAnalyseIndex ? 'white' : 'black'
                          }
                        }
                      } else {
                        return {}
                      }
                    }} />
                  <br></br>
                  <TabPanel whenActive={4}>
                    <Container>
                    <Row>
                    <Col md="3">
                    <Tab id="10" maxStep={3} step={(this.state.selectedAnalyseIndex===null  )? "nope" : "extends" }>
                      <Button outline color="primary" disabled={(this.state.selectedAnalyseIndex===null  )}  onClick={e=>{
                          e.preventDefault();
                          this.setState({idActeur:null,idActeurIsSet:null})
                          this.handleModifyAnalyse(this.state.selectedAnalyse.libelleAt);
                          console.log(this.state.selectedAnalyse.libelleAt)
                      }}>
                        <FontAwesomeIcon
                          icon="pen"
                          color="blue"
                          size="md"
                        />{' '}
                      </Button>
                    </Tab>
                    </Col>
                    <Col md="3">
                    <Tab id="10" maxStep={3} step={(this.state.selectedAnalyseIndex===null  )? "nope" : "extends" }>
                      <Button   disabled={(this.state.selectedAnalyseIndex===null  )} outline color="danger">
                        <FontAwesomeIcon
                          icon="trash"
                          color="red"
                          size="md"
                        />{' '}
                      </Button>
                    </Tab>                    
                    </Col>
                    <Col md="3">
                    <Tab id="1" maxStep={3} step="new" >
                      <Button outline color="success" onClick={e=>{
                          e.preventDefault();
                          this.newAnalyse();
                          //console.log(this.state.selectedAnalyse.libelleAt)
                      }}>
                        <FontAwesomeIcon
                          icon="plus-circle"
                          color="green"
                          size="md"
                        />{' '}
                      </Button>
                    </Tab>
                    </Col>

                    </Row>

                    </Container>
                  </TabPanel>

                </TabPanel>
                {/* ETAPE MODIFICATION ANALYSE
                */}
                <TabPanel whenActive={10}>
                  {/* MODIFICATION ANALYSE */}
                  <h4>Progression :</h4>
                      <Progress animated color="danger" value="45" />
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
                      <Label for="acteurName" md={12}>Acteur traitant :</Label>
                      <Col md={{ size: 12, order: 1, offset: -1 }}>
                        <Input name="acteurName" value={this.state.acteurTraitant} disabled={true}></Input>
                      </Col>
                    </FormGroup>
                  </Form >
                  <br />
                  <br />
                  <ReactTable
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
                              e.preventDefault();
                              this.setState({
                                selectedActeur: rowInfo.index,
                                getRow: rowInfo,
                                // numeroId: rowInfo.original.numeroId,
                                //idFnc: rowInfo.original.idFnc,
                                acteurTraitant: rowInfo.original.nomPrenom,
                                idActeurIsSet:true,
                                idActeur:rowInfo.original.idActeur
                              });
                              console.log(rowInfo.original);
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
                  <br></br>
                  <Row>
                    <Tab id="1" maxStep={3} step="retourRecap">
                       <Button>Annuler</Button>
                    </Tab>
                    <Col md="8" ></Col>
                    <Tab id="1" maxStep={3} step="retourRecap">
                        <Button disabled={!(this.state.idActeurIsSet && this.state.actionCorrective && this.state.correctionIsSet && this.state.causeIsSet && this.state.echeanceIsSet)}color="danger" onClick={e=>{
                          e.preventDefault();
                          this.handleValidModifyAnalyse(this.state.selectedAnalyse.libelleAt);
                        }}>Valider la modification</Button>
                    </Tab>
                  </Row>
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
                      <Button >{'Suivant >>'}</Button>
                    </Tab>
                  </TabPanel>
                  {/*FORMULAIRE BUTTON*/}

                  <TabPanel whenActive={2}>
                    <Tab id="2" maxStep={3} step="prev" >
                      <Button>{'<< Précedent'}</Button>
                    </Tab>
                    <Col md="8" ></Col>
                    <Tab id="2" maxStep={3} step="next">
                      <Button disabled={!(this.state.actionCorrective&&this.state.correctionIsSet&&this.state.causeIsSet&&this.state.echeanceIsSet)}>{'Suivant >>'}&nbsp;</Button>
                    </Tab>
                  </TabPanel>
                  {/*CREER ANALYSE BUTTON*/}
                  <TabPanel whenActive={3}>
                    <Tab id="1" maxStep={3} step="prev" >
                      <br />
                      <Button>{'<< Précedent'}</Button>
                    </Tab>
                    <Col md="8" ></Col>
                    <Tab id="3" maxStep={4} step="next">
                      <br/>
                      <Button type="button" disabled={!(this.state.idActeurIsSet&&this.state.actionCorrective&&this.state.correctionIsSet&&this.state.causeIsSet&&this.state.echeanceIsSet)} onClick={this.createAnalyse}  color="danger">{'Creer l\'analyse'}</Button>
                    </Tab>
                  </TabPanel>
                </Row>
              </TabSwitcher>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.handleSubmit} disabled={!(this.state.dataStruc.length !== 0)}>
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
            data={this.state.responseArray}
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
                      this.retrieveAnaByFnc(rowInfo.original.idFnc);

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