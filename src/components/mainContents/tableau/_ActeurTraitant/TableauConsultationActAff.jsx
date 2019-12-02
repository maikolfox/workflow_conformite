import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

import ReactTable from 'react-table';
import "react-table/react-table.css";
import MediaAsset from '../../../assets/MediaAsset'
import TabSwitcher, { Tab, TabPanel } from "./TabSwitcher/TabSwitcher";

import UploadFile from '../../../assets/uploadFile/TodoItem';
import Columns from '../../../assets/ColumDetailsFnc'

import Processus from "../../../assets/Processus";
import Source from "../../../assets/Source";
import FamilleProcessus from "../../../assets/FamilleProcessus";
import Loader from "../../../assets/Loader";
import Auth from "../../../assets/Auth";
import axios from 'axios';
import DisplayDateFormat from "../../../assets/dateFormatTransform"
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
} from "reactstrap";

export default class ConsultationActAff extends React.Component {


  constructor(props) {
    super(props);
    this.state =
      {
        idFnc: '',
        numeroId: '',
        modal: '',
        id: 0,

        selectedFile: [],
        fileArray: [],
        loaded: 0,

        selected: null,
        selectedActeur: null,
        selectedAnalyse: null,
        selectedAnalyseIndex: null,

        responseToPost: [],
        responseSansDoublon: [],
        isLoaded: false,
        getRow: '',
        idSource: '',
        libelleFamille: '',
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
        resultat: '',
        idActeur: null,
        acteurTraitant: null,
        idActeurIsSet: false,
        
        echeanceActionCorrective:'',

        echeance: '',
        echeanceIsSet: false,

        hasError: false,
        responseSubmit: '',

        dataStruc: [],
        text: '',
        textIsSet: false,
        unAutorize: false,
        analyseFnc: [],


        //File liste State
        todoData: [],
        lastId: 0,
        files: [],

        libelleSource: "",
        idFamille: "",
        ResultModal:''


      }






    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    //this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleModifyAnalyse = this.handleModifyAnalyse.bind(this);
    // this.handleValidModifyAnalyse = this.handleValidModifyAnalyse.bind(this);

    this.newAnalyse = this.newAnalyse.bind(this);
    ///

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onClickHandler = this.onClickHandler.bind(this);
    this.retrieveAnaByFnc = this.retrieveAnaByFnc.bind(this);
    
    // this.handleChange=this.handleChange.bind(this);
    
    this.getUnique = this.getUnique.bind(this);
    this.loadActionAffecte = this.loadActionAffecte.bind(this);
    this.toggleResultModal = this.toggleResultModal.bind(this);


    //File list Handler
    this.handleDelete = this.handleDelete.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.getFiles = this.getFiles.bind(this)

  };

  ///FILE LISTE HANDLER




  getUnique(arr, comp) {

    const unique = arr
      .map(e => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);

    return unique;
  }

  handleAdd(files) {
    files.map(el => {
      const obj =
      {
        id: this.state.lastId,
        name: el.name,
        base64: el.base64,
      }
      console.dir(el.base64)
      const auxTodo = this.state.todoData;
      this.setState(prevState => ({
        todoData: auxTodo.concat(obj), lastId: prevState.lastId + 1, todoText: '', files: null
      }))
    })
  }

  getFiles(files) {
    this.setState({ files: files })
    this.handleAdd(files)
  }
  handleDelete = id => {
    var update = [];
    console.log("id", id)
    this.setState(prevState => {
      prevState.fileArray.map(elem => {
        if (elem.id !== id) { update.push(elem) }
      })
      return {
        fileArray: update
      }
    })
  }

  retrieveAnaByFnc = idfnc => {
    var objectToArray = [];
    // eslint-disable-next-line
    this.state.responseToPost.map(el => {
      if (el.idFnc === idfnc) {

        var object = {
          libelleAt: el.libelleAt,
          cause: el.cause,
          actionCorrective: el.actionCorrective,
          correction: el.correction,
          echeance: el.echeances,
          echeanceActionCorrective:el.echeances2,
          echeanceFormat:DisplayDateFormat(el.echeances),
          echeanceActionCorrectiveFormat:DisplayDateFormat(el.echeances2),

          id: el.id
        }
        objectToArray.push(object);
      }
    })
    this.setState({ analyseFnc: objectToArray });

  }

  //  to suppress 
  //  createAnalyse = event => {
  //  event.preventDefault();
  //  const newItem = {
  //  idFnc: this.state.idFnc,
  //  processus: this.state.idProcessus,
  //  actionCorrective: this.state.actionCorrective,
  //  correction: this.state.correction,
  //  echeance: this.state.echeance,
  //  cause: this.state.cause,
  //  /// TODO A RECUPERER DANS LA SESSION
  //  idActeurDelegataire: Auth.getUsername(),
  //  idActeur: this.state.idActeur,
  //  libelleAt: this.state.libelle
  //  };
  //  this.setState(prevState => ({
  //    dataStruc: prevState.dataStruc.concat(newItem),
  //    libelle: prevState.libelle + 1
  //  }));
  //  console.log(this.state.dataStruc);
  // };


  

  handleSubmit = async e => {
    e.preventDefault();

    console.log("select file", this.state.selectedFile)

    await fetch('/upload',
      {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "idAt": this.state.id,
          "idFnc": this.state.idFnc,
          "resultat": this.state.text,
          //TODO RETRIEVE THIS  VALUE FROM SESSION
          "idActeur": Auth.getUsername()
        })
      }).then(res => res.json())
      .then(
        (result) => {

          // this.setState(prevState => ({
          //   responseToPost: prevState.responseToPost.filter(item => {
          //     return item.idFnc !== this.state.idFnc && item.libelleAt !== this.state.libelle;
          //   })
          // }))
          this.loadActionAffecte()
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
            responseSubmit: error.message,
            hasError: true
          });
        });
    this.toggle();




  }


  // handleModifyAnalyse = itemId => {
  //   const updatedItems = this.state.dataStruc.map(item => {
  //     if (itemId === item.libelleAnalyse) {
  //       this.setState({
  //         cause: item.cause,
  //         correction: item.correction,
  //         echeance: item.echeance,
  //         acteurTraitant: null,
  //         idActeur: null,
  //         libelleAnalyse: item.libelleAt,
  //         actionCorrective: item.actionCorrective
  //       })
  //       console.log(item.cause);
  //     }
  //     return item;
  //   });

  //   this.setState({
  //     dataStruc: [].concat(updatedItems),
  //     selectedAnalyseIndex: null,
  //     selectedActeur: null
  //   });
  // };

  // handleValidModifyAnalyse = itemId => {
  //   const updatedItems = this.state.dataStruc.map(item => {
  //     if (itemId === item.libelleAt) {

  //       this.setState({
  //         cause: item.cause,
  //         correction: item.correction,
  //         echeance: item.echeance,
  //         acteurTraitant: null,
  //         idActeur: null,
  //         libelleAnalyse: item.libelleAt,
  //         actionCorrective: item.actionCorrective
  //       })
  //       console.log(item.cause);
  //       item.idFnc = this.state.idFnc;
  //       item.processus = this.state.idProcessus;
  //       item.actionCorrective = this.state.actionCorrective;
  //       item.correction = this.state.correction;
  //       item.echeance = this.state.echeance;
  //       item.cause = this.state.cause;
  //       //TODO RECUPERER LA VALEUR DANS LA SESSION
  //       item.idActeurDelegataire = Auth.getUsername();
  //       item.idActeur = this.state.idActeur;
  //       item.libelleAnalyse = itemId;
  //     };
  //     return item;
  //   });
  //   this.setState(prevState => ({
  //     dataStruc: prevState.dataStruc.map(el => (el.libelleAt !== updatedItems.libelleAt ? { ...el } : updatedItems))
  //   }));
  // }

  getUnique(arr, comp) {
    const unique = arr
      .map(e => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);
     return unique;
  }

  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal
    });
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
      selectedAnalyseIndex: null
    })

  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      selected: !prevState.selected,
      //add this and  init at null others selected*
      selectedAnalyse: !prevState.selectedAnalyse
    }));
    this.newAnalyse();
    this.setState({ libelle: 1 });
    this.setState({ dataStruc: [],resultat:"",fileArray:[] })
  }

  toggleResultModal() {
    this.setState(prevState => ({
      ResultModal: !prevState.ResultModal,
      selectedAnalyse: !prevState.selectedAnalyse

    }));
    
  }






  async loadActionAffecte() {
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
            "idResponsable": Auth.getUsername(),
            "idProfil": Auth.getProfileTab()
          }
        })
      }).then(res => res.json())
      .then(
        (result) => {
          if (result.data.error === true || result.data.message === "Accès refuser !" || result.data.responses === null) {
            alert(result.data.message);
            window.close();
            this.setState({
              isLoaded: true,
              responseSubmit: result.data.message,
              hasError: false,
              unAutorize: true
            });
          }
          else {
            console.log("resultat ----------------------> ", result.data.responses);
            //filter array and remove doublon

            //I didn't k
            // var cache = {};
            // responseArray = responseArray.filter(function(elem,index,array){
            //     return cache[elem.idFnc]?0:cache[elem.idFnc]=1;
            // });


            var auxResponseTopost = result.data.responses;

            auxResponseTopost.map(el => {
              console.log(el)
              el.libelleSource = Source.find(element => element.idSource === el.idSource).libelleSource;
              el.libelleProcesus = Processus.find(element => element.idProcessus === el.idProcessus).libelleProcessus;
              el.libelleFamille = FamilleProcessus.find(element => element.idFamille === el.idFamille).libelleFamille;

            })
            var responseArrayDoublon = auxResponseTopost;
            var auxResponseTopost = this.getUnique(result.data.responses, "numeroId");

            this.setState({
              isLoaded: true,
              responseToPost: responseArrayDoublon,
              responseSansDoublon: auxResponseTopost,
            });
            console.log("response to post state ", this.state.responseToPost)
            // this.setState({
            //   isLoaded: true,
            //   responseArray:responseArray,//filtering array wil be display in react-tab
            //   responseToPost: result.data.responses // is use to aggragate
            // });
            // console.log(this.state.responseToPost)
          }
        },
        (error) => {
          console.log("124", error.message);
          alert("Erreur lors de la communication avec le serveur , contacter les administrateur si le problème persiste");
          this.setState({
            isLoaded: true,
            responseSubmit: "Erreur lors de la communication avec le serveur , contacter les administrateur si le problème persiste :" + error.message,
            hasError: true
          });
        })
  }


  async onClickHandler() 
  {
    var dataFile = new FormData();
    if(this.state.fileArray.length!==0)
    {  
        for (var x = 0; x < this.state.fileArray.length; x++) 
        {
          console.log("x------>", x)
          if(this.state.fileArray[x].fileObj.type==="application/pdf" 
          ||this.state.fileArray[x].fileObj.type=== "application/vnd.ms-excel"
          ||this.state.fileArray[x].fileObj.type===  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          )
          {dataFile.append('file', this.state.fileArray.fileObj)}
        }
    }
    dataFile.append('idAt', this.state.id)
    dataFile.append("idFnc", this.state.idFnc)
    dataFile.append("resultat", this.state.text)
    dataFile.append("idActeur", Auth.getUsername())

    await axios.post("/upload", dataFile,
    {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total * 100)
          })
        }
    }).then(response=> {
        console.log(response);
           this.setState({
             isLoaded: true,
             responseSubmit: response.data.data.message,
             hasError: false
           });
        })
        .catch((error)=> {
          console.log("124", error);
          alert("Erreur lors de la communication avec le serveur , contacter les administrateurs si le problème persiste");
          this.setState({
            isLoaded: true,
            responseSubmit: error,
            hasError: true
          })
        }).finally(()=>{
          this.toggleNested();
          this.toggle();
          this.loadActionAffecte();
        })
  }


  onChangeHandler = event => 
  {
    event.preventDefault()
    console.log(event.target.files)
    this.setState({
      selectedFile: event.target.files,
      loaded: 0,
    })
    var update=[];
    var fileObjRet =event.target.files
    for (var i = 0; i < fileObjRet.length; i++) 
    {
      // on récupère le i-ème fichier
      console.log(fileObjRet,i,fileObjRet[i].name)
      var ObjetFile={
        name:fileObjRet[i].name,
        id:Date.now()+i,
        fileObj : fileObjRet[i]
      }
      update.push(ObjetFile)
    }

    this.setState(prevState => {
      prevState.fileArray.map(elem => {
          update.push(elem)
      })
      return {
        fileArray: update
      }
    })
    //I DONT KNOW WHY //
    console.log("file array------->",this.state.fileArray)
  
  
  }




  async componentDidMount() {
    this.loadActionAffecte()
  }


  render() {
    const items = this.state.fileArray.map(item => (
      <UploadFile
        key={item.key}
        item={item}
        deleteTodo={this.handleDelete}
      />
    ))

    const analyseColum = [
      {
        Header: 'N° de l\'analyse',
        accessor: 'libelleAt',
        width:"auto"
      },

      {
        Header: 'Echeance',
        accessor: 'echeanceFormat',
        width:"auto"
      },

      {
        Header: 'Echeance action corrective',
        accessor: 'echeanceActionCorrectiveFormat',
        width:"auto"
      }



    ]
    


    var response = (this.state.isLoaded) ? this.state.responseSubmit : <React.Fragment><Loader></Loader><p style={{ textAlign: 'center' }}>Chargement en cours...</p></React.Fragment>
    return (
      <React.Fragment>
        {/*REACT  MODAL FORM*/}
        <div>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
            size="xl"
            centered
            aria-labelledby="example-modal-sizes-title-lg"
            backdrop="static"
          >
            <ModalHeader toggle={this.toggle}>Reception des actions</ModalHeader>
            <ModalBody>
              <TabSwitcher>
                {/* ETAPE 1 RECAPITULATIF DES INFOS DE LA FICHE  */}
                <TabPanel whenActive={1}>
                  <h1 style={{ textAlign: "center" }}>FICHE N° {this.state.numeroId} </h1>
                  {/**QUALIFICATION FNC*/}
                  <MediaAsset libelle="Qualification" content={this.state.qualification} />
                  {/**DESCRIPTION FNC*/}
                  <MediaAsset libelle="Description de la non-conformité" content={this.state.descriptionFnc} />
                  {/**SOURCE*/}
                  <MediaAsset libelle="Source" content={this.state.source} />
                  {/**PROCESSUS*/}
                  <MediaAsset libelle="Processus" content={this.state.libelleProcessus} />
                  {/*FAMILLE*/}
                  <MediaAsset libelle="Famille" content={this.state.libelleFamille} />
                </TabPanel>
                {/* ETAPE 2 FORMULAIRE ANALYSE */}

                <TabPanel whenActive={2}>
                <div style={{ cursor: 'pointer' }}>
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
                              selectedAnalyse: rowInfo.original.libelleAt,
                              getRow: rowInfo,
                              acteurTraitant: rowInfo.original.nomPrenom,
                              idActeur: rowInfo.original.idActeur,
                              cause: rowInfo.original.cause,
                              correction: rowInfo.original.correction,
                              echeance: rowInfo.original.echeance,
                              echeanceActionCorrective :rowInfo.original.echeanceActionCorrective,
                              actionCorrective: rowInfo.original.actionCorrective
                            });
                            console.log(rowInfo.original);
                            this.toggleResultModal();

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
                  <br />
                  </div>
                </TabPanel>

                {/*RENSEIGNEMENT TRAITEMENT ET AJOUT PIECES JOINTES 
                */}
                <TabPanel whenActive={3}>
                  <h1 style={{ textAlign: "center" }}>Recapitulatif analyse {this.state.selectedAnalyse}</h1>
                  <Col>
                    <small >
                      <p style={{ textAlign: "center" }}>Renseigner les resultats du traitement, ajouter une ou plusieurs pièces jointes si nécessaire</p>
                    </small>
                  </Col>
                  <br></br>
                  {/**CAUSE  */}
                  <MediaAsset libelle="Cause" content={this.state.cause} />
                  {/**CORRECTION  */}
                  <MediaAsset libelle="Correction" content={this.state.correction} />
                  {/**ACTION CORRECTIVE */}
                  <MediaAsset libelle="Action corrective" cyontent={this.state.actionCorrective} />
                  {/**SOURCE */}
                  <MediaAsset libelle="Source" content={this.state.source} />
                  {/**ECHEANCES */}
                  <MediaAsset libelle="Echeances" content={DisplayDateFormat(this.state.echeance)} />
                  {/**ECHEANCES ACTION CORRECTIVE */}
                   <MediaAsset libelle="Echeances Actions correctives" content={DisplayDateFormat(this.state.echeanceActionCorrective)} />
                  {/**FORMULAIRE RENSEIGNEMENT RESULTAT */}
                  <Form>
                    <FormGroup row>
                      <Label for="exampleEmail" md={12}>Resultat du traitement</Label>
                      <Col md={{ size: 12, order: 1 }}>
                        <Input valid={this.state.textIsSet} invalid={!this.state.textIsSet}
                          type="textarea"
                          id="selectAgence"
                          name="selectbasic"
                          required
                          max={3}
                          value={this.state.text}
                          onChange={e => {
                            e.preventDefault();
                            this.setState({ text: e.target.value })
                            if (e.target.value !== null && e.target.value !== "") {
                              this.setState({ textIsSet: true })
                            }
                            else { this.setState({ textIsSet: false }) }
                          }}>
                        </Input>
                        <FormText hidden={this.state.textIsSet}>Renseigner le resultat</FormText>
                      </Col>
                      <Row>&nbsp;</Row>
                      <Label md={12}>Ajouter une pièce jointe</Label>
                      <Col md={{ size: 12, order: 1}}>
                      <br />
                      <input type="file" accept="application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.wordprocessingml.document" name="file" multiple onChange={this.onChangeHandler} />
                      </Col>
                      <br></br>
                      {items}
                    </FormGroup>
                  </Form >
                </TabPanel>



                {/* Cette section permet de positionner 
                    les bouttons "suivant" et "precedent" 
                    et de les  masquer au besoin 
                */}

                {/*RECAPITULATIF FNC BUTTON*/}
                <Row noGutters="true" >
                  <TabPanel whenActive={1}>
                    <Col md="10" ></Col>
                    <Tab id="1" maxStep={3} step="next">
                      <Button >{'Suivant >>'}</Button>
                    </Tab>
                  </TabPanel>

                  {/*TABLEAU ANALYSE*/}

                  {/* <TabPanel whenActive={2}>
                    <Tab id="2" maxStep={3} step="prev" >
                      <Button>{'<< Précedent'}</Button>
                    </Tab>
                    <Col md="8" ></Col>
                    <Tab id="2" maxStep={3} step="next">
                      <Button disabled={!(this.state.selectedAnalyseIndex !== null)}>{'Suivant >>'}&nbsp;</Button>
                    </Tab>
                  </TabPanel> */}


                  {/*CREER ANALYSE BUTTON*/}
                  <TabPanel whenActive={3}>
                    <Tab id="1" maxStep={3} step="prev" >
                      <br />
                      <Button>{'<< Précedent'}</Button>
                    </Tab>
                    <Col md="8" ></Col>
                    <Tab id="3" maxStep={4} step="next">
                      <br />
                    </Tab>
                  </TabPanel>
                </Row>
              </TabSwitcher>
            </ModalBody>
            <ModalFooter>
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
            <ModalHeader toggle={this.toggleNested} >{response}</ModalHeader>
          </Modal>
          <Modal isOpen={this.state.ResultModal}
            toggle={this.toggleResultModal}
            onClosed={this.state.closeAll ? this.toggle : undefined}
            centered
            backdrop="static"
            size="xl">
            {/* <ModalHeader toggle={this.toggleNested}>{response}</ModalHeader> */}
            <ModalBody>
            <ModalHeader toggle={this.toggleResultModal}>Renseigner le resultat</ModalHeader>
                  <br></br>
            <h3 style={{ textAlign: "center" }}>Recapitulatif analyse {this.state.selectedAnalyse}</h3>
                  <Col>
                    <small >
                      <p style={{ textAlign: "center" }}>Renseigner les resultats du traitement, ajouter une ou plusieurs pièces jointes si nécessaire</p>
                    </small>
                  </Col>
                  <br></br>
                  {/**CAUSE  */}
                  <MediaAsset libelle="Cause" content={this.state.cause} />
                  {/**CORRECTION  */}
                  <MediaAsset libelle="Correction" content={this.state.correction} />
                  {/**ACTION CORRECTIVE */}
                  <MediaAsset libelle="Action corrective" content={this.state.actionCorrective} />
                  {/**SOURCE */}
                  <MediaAsset libelle="Source" content={this.state.source} />
                  {/**ECHEANCES */}
                  <MediaAsset libelle="Echeances" content={DisplayDateFormat(this.state.echeance)} />
                  {/**ECHEANCES ACTION CORRECTIVE */}

                   <MediaAsset libelle="Echeances Action corrective" content={DisplayDateFormat(this.state.echeanceActionCorrective)} />
                  {/**FORMULAIRE RENSEIGNEMENT RESULTAT */}
                  <Form>
                    <FormGroup>
                      <Label for="exampleEmail" md={12}>Resultat du traitement</Label>
                      <Col md={{ size: 12, order: 1, offset: -1 }}>
                        <Input valid={this.state.textIsSet} invalid={!this.state.textIsSet}
                          type="textarea"
                          id="selectAgence"
                          name="selectbasic"
                          required
                          max={3}
                          value={this.state.text}
                          onChange={e => {
                            e.preventDefault();
                            this.setState({ text: e.target.value })
                            if (e.target.value !== null && e.target.value !== "") {
                              this.setState({ textIsSet: true })
                            }
                            else { this.setState({ textIsSet: false }) }
                          }}>
                        </Input>
                        <FormText hidden={this.state.textIsSet}>Renseigner le resultat</FormText>
                      </Col>
                      <Row>&nbsp;</Row>
                      <Label>Ajouter une pièce jointe</Label>
                      <br />
                      <input type="file" accept="application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.wordprocessingml.document" name="file" multiple onChange={this.onChangeHandler} />
                      <br></br>
                      {items}
                    </FormGroup>
                  </Form >
            </ModalBody>
            <ModalFooter>
                {/* <Button color="danger" onClick={this.handleSubmit} disabled={(reg.test(this.state.text)||this.state.text==='')}> */}
              <Button color="danger" onClick={this.onClickHandler} disabled={(!(this.state.textIsSet))}>
                Soumettre
              </Button>{" "}
            </ModalFooter>
         </Modal>

        </div>
        {/*REACT  TABLE*/}
        <div style={{ cursor: 'pointer' }}>
          <ReactTable
            filterable={true}
            loading={!this.state.isLoaded}
            minRows={5}
            noDataText={(this.state.hasError) ? "Erreur lors de la recuperation des données,contactez les administrateur!" : "Aucune fiche à valider"}
            data={this.state.responseSansDoublon}
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
                      id: rowInfo.original.id,
                      qualification: rowInfo.original.qualification,
                      source: rowInfo.original.libelleSource,
                      libelleProcessus: rowInfo.original.libelleProcesus,
                      libelleFamille: rowInfo.original.libelleFamille
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