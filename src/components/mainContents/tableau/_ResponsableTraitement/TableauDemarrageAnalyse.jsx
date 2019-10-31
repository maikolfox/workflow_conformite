import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPen,faPlusCircle,faBan,faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
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
//import ActeurList from '../../../assets/ActeurData';
import ActeurListSelect from '../../../assets/ActeurDataSelectList';

//import ActeurColumns from '../../../assets/ActeurColumns'
import Loader from "../../../assets/Loader";
import FilterCaseInsensitive from '../../../assets/filterInsensitive';
import SelectComp from 'react-select';
import AnalyseColum from "../../../assets/AnalyseColumn"
import Auth from '../../../assets/Auth';

             
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
  Container,
  //Progress,
  // Container,
  Tooltip  //Fade
 
} from "reactstrap";


function AnalyseItem(props) {
  return (
      <Row style={{heigth:"60%",width:"60%"}}>   
        <Form>
        <FormGroup>  
              <Row>
              <Label for="correction" md={4}>Correction</Label>
              <Col md={{ size: 6, order: 1}}>
                <Input valid={props.item.correctionIsSet} invalid={!props.item.correctionIsSet}
                  type="textarea"
                  id="correction"
                  name="correction"
                  value={props.item.corection}
                  onChange={(e) => props.handleChangeCorrection(props.item.id,e.target.value)}
                  />
                <FormText hidden={props.item.correctionIsSet}>Renseigner la correction</FormText>
              </Col>
              <Row>&nbsp;</Row>

              <Col md={{ size: 6, order: 1}}>
              <Label for="EcheanceCorrection" md={4}>Echeance correction</Label>
                  <Input md={"auto"} valid={props.item.echeanceIsSet} invalid={!props.item.echeanceIsSet}
                  type="date"
                  min={props.currentDate()}
                  id="EcheanceCorrection"
                  name="EcheanceCorrection"
                  value={props.item.echeance}
                  onChange={(e) => props.handleChangeEcheanceCorrection(props.item.id,e.target.value)}
                />
                <FormText hidden={props.item.correctionIsSet}>Renseigner l'écheance correction</FormText>
              </Col>    
              </Row>          
              <Row>&nbsp;</Row>
              <Label for="Cause" md={12}>Cause</Label>
              <Col md={{ size: 12, order: 1, offset: -1 }}>
                <Input valid={props.item.cause} invalid={!props.item.cause}
                  type="textarea"
                  id="cause"
                  name="cause"
                  value={props.item.cause}
                  onChange={(e) => props.handleChangeCause(props.item.id,e.target.value)}
                  />
                <FormText hidden={props.item.causeIsSet}>Renseigner la cause</FormText>
              </Col>
              <Label for="ActionCorrective" md={12}>Action corrective</Label>
              <Col md={12}>
              <Input valid={props.item.cause} invalid={!props.item.cause}
                  type="textarea"
                  id="cause"
                  name="cause"
                  value={props.item.cause}
                  onChange={(e) => props.handleChangeCause(props.item.id,e.target.value)}
                  />
              </Col >
              <Row>&nbsp;</Row>
              <Label for="Cause" md={12}>Acteur</Label>
              <Col md={12}>
              <SelectComp onChange={(e)=>props.handleSelectComp(e,props.item.id)} options={ActeurListSelect} />
              </Col >

              </FormGroup>
              </Form>
      </Row>      
     )
}

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
    this.handleSelectComp=this.handleSelectComp.bind(this);
    this.currentDate = this.currentDate.bind(this);
    this.handleModifyAnalyse=this.handleModifyAnalyse.bind(this);
    this.handleValidModifyAnalyse= this.handleValidModifyAnalyse.bind(this);
    this.newAnalyse=this.newAnalyse.bind(this);
    this.toggleToolTips=this.toggleToolTips.bind(this);

    
    this.handleChangeDelete = this.handleChangeDelete.bind(this);
    this.handleChangeActionCorrective=this.handleChangeActionCorrective.bind(this);
    this.handleChangeEcheanceAction=this.handleChangeEcheanceAction.bind(this);
    this.handleChangeEcheanceCorrection=this.handleChangeEcheanceCorrection.bind(this);

    this.handleChangeCause=this.handleChangeCause.bind(this);
    this.handleChangeCorrection = this.handleChangeCorrection.bind(this);
    this.handleAddAction = this.handleAddAction.bind(this);
  };


  //*to do inspire dynamic  **/
  //DELETE ACTION 
  handleChangeDelete(id) {
    const aux=[];
    this.setState(prevState => {
        const updatedTodos = prevState.todos.map(todo => {
            if (todo.id !== id) {
              
              aux.push(todo)
            
            }
            return aux
        })
        return {
            dataStruc: updatedTodos
        }
    })
}

 //Action Corrective
 handleChangeActionCorrective(id,textValue) 
 {
    this.setState(prevState => {
        const updatedTodos = prevState.dataStruc.map(todo => {
            if (todo.id === id) {
                todo.actionCorrective = textValue
            }
            return todo
        })
        return {
          dataStruc: updatedTodos
        }
    })
}

//Causes
handleChangeCause(id,textValue) 
 {
    this.setState(prevState => {
        const updatedTodos = prevState.dataStruc.map(todo => {
            if (todo.id === id) {
                todo.cause = textValue
            }
            return todo
        })
        return {
          dataStruc: updatedTodos
        }
    })
}


//Correction
handleChangeCorrection(id,textValue) {
  this.setState(prevState => {
      const updatedTodos = prevState.dataStruc.map(todo => {
          if (todo.id === id) {
              todo.correction = textValue
          }
          return todo
      })
      return {
        dataStruc: updatedTodos
      }
  })
}

//Echeance correction
handleChangeEcheanceCorrection(id,textValue) 
{
  this.setState(prevState => {
      const updatedTodos = prevState.dataStruc.map(todo => {
          if (todo.id === id) {
              todo.echeance = textValue
          }
          return todo
      })
      return {
        dataStruc: updatedTodos
      }
  })
}


//Echeance Action
handleChangeEcheanceAction(id,textValue) 
{
  this.setState(prevState => {
      const updatedTodos = prevState.dataStruc.map(todo => {
          if (todo.id === id) {
              todo.echeanceAction = textValue
          }
          return todo
      })
      return {
        dataStruc: updatedTodos
      }
  })
}

handleAddAction() {
   var aux=this.state.dataStruc;
   var data= {
    id:Date.now(),
    cause: null,
    //echeance ===> echeance correction
    echeance:this.currentDate(),
    //echeance2 ====> echeance action corrective
    echeanceAction:null,
    correction:null,
    actionCorrective:null,
    idActeurDelegataire: Auth.getUsername(),
    idActeur: null,
    correctionIsSet:false,
    causeIsSet:false,
    actionCorrectiveIsSet:false,
    echeanceActionIsSet:false
}
aux.push(data);
 this.setState({
     dataStruc:aux
 })
}

  ///**** */
  handleSelectComp=(selectOption ,id)=>
  {
    this.setState(prevState => {
      const updatedTodos = prevState.dataStruc.map(todo => {
          if (todo.id === id) {
              todo.idActeur = selectOption.value
              if( selectOption.value.trim!=="" && selectOption.value!==null){
                todo.idActeurIsSet=true

              }else  todo.idActeurIsSet=false;
            }
          return todo
      })
      return {
        dataStruc: updatedTodos
      }
  })
 }


  toggleToolTips() {
    this.setState(prevState=>({
      tooltipOpen: !prevState.tooltipOpen
  }))
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
      idActeurDelegataire: Auth.getUsername(),
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
    this.setState({isLoaded:false});
    
    
     await fetch('/validationRoutage/fnc',
      {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "data":
          { 
            "idResponsable": Auth.getUsername(),
            "idFnc":this.state.idFnc,
            "statutRoutage":this.state.valRoutage,
            "numeroId":this.state.numeroId,
            "libelleProcessus":this.state.libelleProcessus,
            "libelleFamille":this.state.libelleFamille,
            "libelleSoure":this.state.libelleSource,
            "descriptionFNC":this.state.descriptionFnc,
            "qualification":this.state.qualification
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
        item.idActeurDelegataire= Auth.getUsername();
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
      echeanceIsSet: false,
      
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
            "idResponsable":  Auth.getUsername(),
            "idProfil": Auth.getProfileTab()
          }
        })
      }).then(res => res.json())
      .then(
        (result) => {
          if(result.data.error=== true || result.data.message==="Accès refuser !" || result.data.responses===null)
          { 
            alert(result.data.message);
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
        if(this.props.match.params.idFnc!==undefined){
          console.log("-------->idfnc",this.props.match.params.idFnc)
         const fiche= this.state.responseToPost.find(el => el.numeroId=== this.props.match.params.idFnc)
              
         if(fiche!==undefined){
          this.toggle();
                      this.setState({
                        idProcessus: fiche.idProcessus,
                        numeroId: fiche.numeroId,
                        descriptionFnc: fiche.descriptionFnc,
                        idFnc: fiche.idFnc,
                        qualification:fiche.qualification,
                        libelleFamille:fiche.libelleFamille,
                        libelleSource:fiche.libelleSource,
                        libelleProcessus:fiche.libelleProcesus
                      });


         }
        }
  
    
  }

  render() {
  const buttonDemarrerAna= <Button size="lg"  color="success" block>{'Demarrer l\'analyse'}</Button>                
  const buttonSoumettre=<Button color="danger" size="lg" onClick={this.handleSubmitValidation} block>
  Soumettre la fiche pour correction 
  </Button>

    const conditionnalBoutton=(this.state.valRoutage) ?  buttonSoumettre : buttonDemarrerAna

    var response=(this.state.isLoaded) ? this.state.responseSubmit : <React.Fragment><Loader></Loader><p style={{textAlign:'center'}}>Chargement en cours...</p></React.Fragment>

    const AnalyseItem_ = this.state.dataStruc.map(item => <AnalyseItem key={item.id} item={item} handleChangeCorrection={this.handleChangeCorrection}
      handleChangeEcheanceCorrection={this.handleChangeEcheanceCorrection} handleSelectComp={this.handleSelectComp} currentDate={this.currentDate} handleChangeCause={this.handleChangeCause}
      />)

////LIBRARY//////////////////////////////////////////////
    library.add(faPen,faBan, faTrash,faPlusCircle,faExclamationTriangle);
////////////////////////////////////////////////////////
    


    //ANALYSE
    
    

    if(this.state.unAutorize)
    {
        return(<Authorization/>) 
    }
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
                  <MediaAsset libelle="Qualification" content={this.state.qualification} />
                  {/**DESCRIPTION FNC*/}
                  <MediaAsset libelle="Description de la non conformite" content={this.state.descriptionFnc} />
                  {/**SOURCE*/}
                  <MediaAsset libelle="Source" content={this.state.libelleSource} />
                  {/**PROCESSUS*/}
                  <MediaAsset libelle="Processus" content={this.state.libelleProcessus} />
                  {/*FAMILLE*/}
                  <MediaAsset libelle="Famille" content={this.state.libelleFamille} />
                  <Col md={{ size: '12', offset: 0 }}>
                              <TabPanel whenActive={1}>
                                <Tab id="1" md={12} padding={0} paddingRigth={0} maxStep={3} step="next">
                                  {conditionnalBoutton}
                                </Tab>
                              </TabPanel>
                           </Col>
                  <hr></hr>
                  <Form onSubmit={this.handleSubmit}>
                <FormGroup check>
                  <FormGroup tag="fieldset">
                    <legend><FontAwesomeIcon
                                icon="exclamation-triangle"
                                color="red"
                                size="md"
                              /> En cas de routage incorrecte cocher la case suivante</legend>
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
                          
                       </Row>
                    </FormGroup>
                  </FormGroup>
                </FormGroup>
              </Form>
              </TabPanel>
                <TabPanel whenActive={2}>
                    <h1 style={{ textAlign: "center" }}>CREER L'ANALYSE</h1>
                  <Form onSubmit={this.handleSubmit}>
                  {AnalyseItem_}
                    <Row>
                    <Tab id="1" padding="30px" maxStep={3} step="retourRecap">
                       <Button>Annuler</Button>
                    </Tab>
                    <Col md="8" ></Col>
                    <Tab id="1" padding="105px" maxStep={3} step="nope">
                    <Button color="danger" onClick={this.createAnalyse} disabled={!(this.state.actionCorrective && this.state.correctionIsSet && this.state.causeIsSet && this.state.echeanceIsSet)}>{'Affecter l\'analyse'}&nbsp;</Button>
                    </Tab>
                  </Row>
                  </Form >
                      <Col>
                        <small style={{ textAlign: "center" }}>
                        <Button outline color="success" onClick={this.handleAddAction}>
                              <FontAwesomeIcon
                                icon="plus-circle"
                                color="green"
                                size="md"
                              />{' Ajouter'}
                            </Button>
                        </small>
                      </Col>
                      <br></br>
                     
                  <Tab id="1" md={1} padding="0px" maxStep={3} step="prev">
                     <Button>Retour</Button>
                  </Tab>
                </TabPanel>
              </TabSwitcher>
            </ModalBody>
            <ModalFooter>
            <Button color="danger" onClick={this.handleSubmit} disabled={(this.state.valRoutage=== true) || (this.state.dataStruc.length === 0 )}>
                {this.state.dataStruc.length > 1 ? "Soummettre les analyses":"Soummettre l'analyse" }  
            </Button>
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