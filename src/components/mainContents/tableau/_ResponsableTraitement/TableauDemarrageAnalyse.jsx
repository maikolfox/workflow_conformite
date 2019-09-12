import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPen,faPlusCircle,faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { Table } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
//import Loader from 'react-loader-spinner'
import ReactTable from 'react-table';
import ReactTableActeur from 'react-table';
import "react-table/react-table.css";
import MediaAsset from '../../../assets/MediaAsset'
//import CorrectionRoutageModal from "../modals/CorrectionRoutageModal";
import TabSwitcher, { Tab, TabPanel } from "./TabSwitcher/TabSwitcher";
import Authorization from '../../Authorization_401';
import Columns from '../../../assets/ColumDetailsFnc';
import ActeurList from '../../../assets/ActeurData'
import ActeurColumns from '../../../assets/ActeurColumns'
import Loader from "../../../assets/Loader"
import FilterCaseInsensitive from '../../../assets/filterInsensitive'



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
  Progress,Container,
  Tooltip  ,Fade
 
} from "reactstrap";


export default class DemarrageAnalyse extends React.Component {
  
  constructor(props) {
    super(props);
    this.state =
      {
        idFnc: '',
        numeroId: '',
        modal: '',
        
        selected: null,
        selectedActeur: null,
        
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
        responseSubmit: '',

        dataStruc: [],

        selectedAnalyseIndex:null,
        selectedAnalyse: null,

        unAutorize:false,
        libelleProcessus:'',
        libelleFamille:'',
        libelleSource:'',
        valRoutage:false,

    }
    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitValidation = this.handleSubmitValidation.bind(this);

    this.currentDate = this.currentDate.bind(this);
    this.handleModifyAnalyse=this.handleModifyAnalyse.bind(this);
    this.handleValidModifyAnalyse= this.handleValidModifyAnalyse.bind(this);
    this.newAnalyse=this.newAnalyse.bind(this);
    this.toggleToolTips=this.toggleToolTips.bind(this);
  };


  toggleToolTips() {
    this.setState(prevState=>({
      tooltipOpen: !prevState.tooltipOpen
  }));
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

  handleSubmitValidation = async e => {
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
          "data": this.state.dataStruc,
          "numeroId":this.state.numeroId,
          
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
        this.setState({
                      cause: item.cause,
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
            
            /*TODO A RECUPERER DANS LA SESSION*/
            "idResponsable": "maikol.ahoue@bridgebankgroup.com",
            "idProfil": [
              { "idProfil": 2 }
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
  const buttonDemarrerAna= <Button color="success" >{'Demarrer l\'analyse'}</Button>                
  const buttonSoumettre=<Button color="danger" onClick={this.handleSubmitValidation}>
  Soumettre la fiche pour correction 
  </Button>

    const conditionnalBoutton=(this.state.valRoutage) ?  buttonSoumettre : buttonDemarrerAna

    var response=(this.state.isLoaded) ? this.state.responseSubmit : <React.Fragment><Loader></Loader><p style={{textAlign:'center'}}>Chargement en cours...</p></React.Fragment>

///LIBRARY//////////////////////////////////////////////
    library.add(faPen,faBan, faTrash,faPlusCircle);
////////////////////////////////////////////////////////
    

    //ANALYSE
    const analyseColum = [
      {
        Header: 'N° de l\'analyse',
        accessor: 'libelleAt',
      },

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
        Header: 'Email',
        accessor: 'idActeur',
      },
    ]
    

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
            style={{maxWidth: '1600px', width: '80%'}}
            centered
            aria-labelledby="example-modal-sizes-title-lg"
            backdrop="static"
          >
            <ModalHeader toggle={this.toggle}>Demarrage de l'analyse</ModalHeader>
            <ModalBody>
              <TabSwitcher>
                {/* ETAPE 1 RECAPITULATIF DES INFOS DE LA FICHE-VALIDATION ROUTAGE*/}
               

                <TabPanel whenActive={1}>
                  <h1 style={{ textAlign: "center" }}>FICHE N° {this.state.numeroId} </h1>
                  {/**QUALIFICATION FNC*/}
                  <MediaAsset libelle="Qualification" content={this.state.qualification===1? "Mineur" :"Majeur"} />
                  {/**DESCRIPTION FNC*/}
                  <MediaAsset libelle="Description de la non conformite" content={this.state.descriptionFnc} />
                  {/**SOURCE*/}
                  <MediaAsset libelle="Source" content={this.state.libelleSource} />
                  {/**PROCESSUS*/}
                  <MediaAsset libelle="Processus" content={this.state.libelleProcessus} />
                  {/*FAMILLE*/}
                  <MediaAsset libelle="Famille" content={this.state.libelleFamille} />
                  <hr></hr>
                  <Form onSubmit={this.handleSubmit}>
                <FormGroup check>
                  <FormGroup tag="fieldset">
                    <legend>Validation routage</legend>
                    <FormGroup check style={{color:'red'}}>
                    <Row>
                      <Col md={{ size: '2'}}>
                      <Label check>
                        <span id="TooltipExample">
                        <Input type="checkbox" name="radio1" onChange={e =>{ 
                        this.setState(prevState=>({
                          valRoutage:!prevState.valRoutage
                        }));
                        
                        console.log(e.target.value)
                        }}  />{' '}Routage incorrect
                        </span>
                        <Tooltip placement="right" isOpen={this.state.tooltipOpen} target="TooltipExample" toggle={this.toggleToolTips}>
                           <p> Cocher cette case ,appuyer ensuite sur le boutton  "Soummettre la fiche pour correction" pour envoyer la FNC à l'Organisation pour correction</p>
                      </Tooltip>
                      </Label>
                      </Col>
                      {/* <Col md={{ size: '4'}}>
                           <Button  color="danger" onClick={this.handleSubmit} hidden={!(this.state.valRoutage!==false)}>
                               <span style={{fontSize:'80%'}}>Signaler un mauvais routage</span>
                           </Button>
                       </Col> */}
                          <Col md={{ size: '4', offset: 2 }}>
                              <TabPanel whenActive={1}>
                                <Tab id="1" maxStep={3} step="next">

                                  {conditionnalBoutton}

                                </Tab>
                              </TabPanel>

                           </Col>
                       </Row>
                    </FormGroup>
                  </FormGroup>
                </FormGroup>
              </Form>
                
                
                
                
                </TabPanel>

                {/* ETAPE 2 FORMULAIRE ANALYSE */}
                <TabPanel whenActive={2}>
                  <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                      <h4>Progression :</h4>
                      <Progress animated color="danger" value="45" />
                      <br></br>
                      <h1 style={{ textAlign: "center" }}>Formulaire d'analyse</h1>
                      <Col><small style={{textAlign:"center"}}>Veuillez remplir le formulaire pour poursuivre</small></Col>

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
                        <FormText hidden={this.state.echeanceIsSet}>Renseigner l'écheances</FormText>
                      </Col>
                      <Row>&nbsp;</Row>
                    </FormGroup>
                  </Form>
                </TabPanel>
                {/*TODO : charger le json acteur ETAPE 3 AJOUTER UN ACTEUR TRAITANT */}
                <TabPanel whenActive={3}>
                  {/* CHOIX DE L'ACTEUR TRAITANT*/}
                  <h4>Progression :</h4>
                      <Progress animated color="danger" value="55" />
                      <br></br>
                      <h1 style={{ textAlign: "center" }}>Choix de l'acteur traitant</h1>
                      <Col><small>Veuillez remplir choisir un acteur traitant en le selectionnant dans le tableau ci-dessous, 
                        si vous êtes l'acteur vous pouvez selectionner votre nom</small></Col>

                  <Form >
                    <FormGroup>
                      <Label for="acteurName" md={12}>Acteur traitant :</Label>
                      <Col md={{ size: 12, order: 1, offset: -1 }}>
                        <Input name="acteurName" value={this.state.acteurTraitant} disabled={true}></Input>
                      </Col>
                    </FormGroup>
                  </Form >
                  <br />
                  <br />
                  <strong>Selectionner un acteur traitant parmis les acteurs ci-dessous :</strong>
                  <br/>
                  <ReactTableActeur
                    filterable={true}
                    loading={!this.state.isLoaded}
                    defaultFilterMethod={FilterCaseInsensitive}
                    minRows={5}
                    noDataText={(this.state.hasError) ? "Erreur lors de la recuperation des données,contactez les administrateur!" : "Aucune fiche à valider"}
                    data={ActeurList}
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
                                idActeur:rowInfo.original.idActeur,
                                idActeurIsSet:true

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
                      <ReactTableActeur
                    filterable={true}
                    loading={!this.state.isLoaded}
                    defaultFilterMethod={FilterCaseInsensitive}
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
                  <ReactTableActeur
                    filterable={true}
                    defaultFilterMethod={FilterCaseInsensitive}
                    loading={!this.state.isLoaded}
                    minRows={5}
                    noDataText={(this.state.hasError) ? "Erreur lors de la recuperation des données,contactez les administrateur!" : "Aucune fiche à valider"}
                    data={ActeurList}
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
             {/***CONDITIONNAL BOUTTON */} 
              {/* <Button color="danger" onClick={this.handleSubmit} disabled={!(this.state.dataStruc.length !== 0)}>
                Soumettre
             </Button>{" "} */}
                <Button color="danger" onClick={this.handleSubmit} disabled={(this.state.valRoutage=== true) || (this.state.dataStruc.length === 0 )}>
                {this.state.libelle > 2 ? "Soummettre les analyses":"Soummettre l\'analyse" }  
            </Button>
             
             {/**Conditionnal bouton*/}
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
            <ModalBody toggle={this.toggleNested} >{response}</ModalBody>
          </Modal>
        </div>
        {/*REACT  TABLE*/}
        <div style={{ cursor: 'pointer' }}>
          <ReactTable
            filterable={true}
            defaultFilterMethod={FilterCaseInsensitive}
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
                        idFnc: rowInfo.original.idFnc,
                        qualification:rowInfo.original.qualification,
                        libelleFamille:rowInfo.original.libelleFamille,
                        libelleSource:rowInfo.original.libelleSource,
                        libelleProcessus:rowInfo.original.libelleProcesus
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