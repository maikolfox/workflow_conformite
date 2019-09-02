import React from 'react';
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

import 'react-quill/dist/quill.snow.css'; // ES6
import ReactQuill from 'react-quill';
import ReactHtmlParser from 'react-html-parser';
import UploadFile from '../../../assets/uploadFile/TodoApp'

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
        resultat:'',
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
        text:'',
        textIsSet:false,
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
    this.handleChange=this.handleChange.bind(this);

  };
  //I WAS HERE 
  handleChange (value){
   this.setState({ text: value })
    this.setState({resultat: ReactHtmlParser(this.state.text)});
    (value.trim!=='' && value.length>0 && this.state.resultat!==null) ? this.setState({resultatIsSet:true}) : this.setState({resultatIsSet:false})
 console.log(this.state.resultat.length);

  }
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
    // <p>(?=\s<\/p>)|<p>(?=<br><\/p>)|<p>(?=<br\/><\/p>)|<p|<h(1|2|3)>(?=<strong><em><span class="ql-cursor">?<\/span><\/em><\/strong>(<\/p|<\/h(1|2|3)>))|<p>(?=<strong>(\s|\s<em>\s<\/em>)<\/strong><\/p>)
   
    //const reg = /<p>(?=\s{2,}<\/p>)|<p>(?=<br><\/p>)|<p>(?=<br\/><\/p>)|<p>(?=<strong>\s{2,}<\/strong><\/p>)/
    
    
    
    ///<p>\s{0,}<\/p>|<p><br><\/p>{0,1}|<p><strong>\s{0,}<\/strong><\/p>|<p>\w{1,}<\/p>|<(u|o)l><li><br><\/li><\/(u|o)l>|<h(1|2|3)><em><span class=*><\/span><\/em><\/h(1|2|3)>|<h(1|2|3)><br><\/h(1|2|3)>|<p|h(1|2|3)|(o|l)l\/><li><strong><em><span class=*><\/span><\/em><\/strong><\/li>   /;
   
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
                                selectedAnalyse: rowInfo.original.libelleAt,
                                getRow: rowInfo,
                                acteurTraitant: rowInfo.original.nomPrenom,
                                idActeur:rowInfo.original.idActeur,
                                cause:rowInfo.original.cause,
                                correction:rowInfo.original.correction,
                                echeance:rowInfo.original.echeance,
                                
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
                </TabPanel>

                {/*RENSEIGNEMENT TRAITEMENT ET AJOUT PIECES JOINTES 
                */}
                <TabPanel whenActive={3}>
                <h1 style={{ textAlign: "center" }}>Recapitulatif analyse {this.state.selectedAnalyse}</h1>
                <Col>
                    <small >
                     <p style={{textAlign:"center"}}>Renseigner les resultats du traitement une fois ceux-ci terminé , ajouter un pièce jointe si nécessaire</p>
                    </small>
                </Col>
                <br></br>
                {/**DETAILS ANALYSE */}
                                
                {this.state.text.toString()}
              


                  {/**ACTION CORRECTIVE */}


                {/**CAUSE  */}
                <MediaAsset libelle="Cause" content={this.state.cause} />
                {/**CORRECTION  */}
                <MediaAsset libelle="Correction" content={this.state.correction} />
                {/**ACTION CORRECTIVE */}
                <MediaAsset libelle="Action corrective" content={this.state.source} />
                {/**ECHEANCES */}
                <MediaAsset libelle="Echeances" content={this.state.echeance} />
                
                {/**FORMULAIRE RENSEIGNEMENT RESULTAT */}
                <Form>

                <FormGroup>                    
                    <Label for="exampleEmail" md={12}>Resultat du traitement  100 caractères ({this.state.text.length}/100)</Label>
                      <Col md={{ size: 12, order: 1, offset: -1 }}>
                        <Input valid={this.state.textIsSet} invalid={!this.state.textIsSet}
                          type="textarea"
                          id="selectAgence"
                          name="selectbasic"
                          value={this.state.text}
                          onChange={e => {
                              e.preventDefault();
                                this.setState({ text: e.target.value })
                                if (e.target.value !== null && e.target.value !== "" &&e.target.value.length>=99) {
                                  this.setState({ textIsSet: true })
                                }
                                else { this.setState({ textIsSet: false }) }           
                          }}>
                        </Input>
                        <FormText hidden={this.state.textIsSet}>Renseigner le resultat</FormText>
                      </Col>
                      <Row>&nbsp;</Row>
                      <Label>Ajouter une pièce jointe</Label>  
                      <UploadFile></UploadFile>
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

                  <TabPanel whenActive={2}>
                    <Tab id="2" maxStep={3} step="prev" >
                      <Button>{'<< Précedent'}</Button>
                    </Tab>
                    <Col md="8" ></Col>
                    <Tab id="2" maxStep={3} step="next">
                      <Button disabled={!(this.state.selectedAnalyseIndex!==null)}>{'Suivant >>'}&nbsp;</Button>
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
                      {/* <Button type="button" disabled={!(this.state.idActeurIsSet&&this.state.actionCorrective&&this.state.correctionIsSet&&this.state.causeIsSet&&this.state.echeanceIsSet)} onClick={this.createAnalyse}  color="danger">{'Ajouter une pièce jointe'}</Button> */}
                    </Tab>
                  </TabPanel>
                </Row>
              </TabSwitcher>
            </ModalBody>
            <ModalFooter>
              {/* <Button color="danger" onClick={this.handleSubmit} disabled={(reg.test(this.state.text)||this.state.text==='')}> */}
              <Button color="danger" onClick={this.handleSubmit} disabled={(!(this.state.textIsSet))}>
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