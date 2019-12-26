import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faPen, faPlusCircle, faBan, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
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
import Columns from '../../../assets/ColumDetailsFnc';
//import ActeurList from '../../../assets/ActeurData';
import ActeurListSelect from '../../../assets/ActeurDataSelectList';

//import ActeurColumns from '../../../assets/ActeurColumns'
import Loader from "../../../assets/Loader";
import FilterCaseInsensitive from '../../../assets/filterInsensitive';
import SelectComp from 'react-select';
import AnalyseColum from "../../../assets/AnalyseColumn"
import Auth from '../../../assets/Auth';
import ConfigUrl from '../../../assets/ConfigUrl'

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
  //Container,
  //Progress,
  // Container,
  Tooltip  
  //Fade

} from "reactstrap";


function AnalyseItem(props) {
  return (
    <Form className="formAnalyse">
      {/* <h2>Analyse N° {props.item.libelleAt}  </h2>  */}
      <div className="analyseHeader"><h5 class="analyseTitle">Analyse N° {props.item.libelleAt}</h5><button onClick={() => props.handleChangeDelete(props.item.id)} type="button" className="close" aria-label="Close"><span aria-hidden="true"><Button outline color="danger"  onClick={() => props.handleChangeDelete(props.item.id)}>
              <FontAwesomeIcon
                icon="trash"
                color="red"
                size="sm"
                title="Supprimer"
              />
            </Button></span></button></div>
      
      <Col className="analyseBody">
      <Row form >
        <Col md={6} >
          <FormGroup >
            {/**correction ***/}
            <Label for="correction">Correction</Label>
            <Input valid={props.item.correctionIsSet} invalid={!props.item.correctionIsSet}
              type="textarea"
              id="correction"
              name="correction"
              value={props.item.correction}
              onChange={(e) => props.handleChangeCorrection(props.item.id, e.target.value)} />
            <FormText hidden={props.item.correctionIsSet}>Renseigner la correction</FormText>
          </FormGroup>
        </Col>
        {/**cause */}
        <Col md={6}>
          <FormGroup>
            <Label for="Cause">Cause</Label>
            <Input valid={props.item.causeIsSet} invalid={!props.item.causeIsSet}
              type="textarea"
              id="cause"
              name="cause"
              value={props.item.cause}
              onChange={(e) => props.handleChangeCause(props.item.id, e.target.value)} />
            <FormText hidden={props.item.causeIsSet}>Renseigner la cause</FormText>
          </FormGroup>
        </Col>
      </Row>
      <Row form>
        <Col md={6}>
          {/**echeance correction */}
          <Label for="EcheanceCorrection">Echéance correction</Label>
          <Input md={"auto"} valid={props.item.echeanceIsSet} invalid={!props.item.echeanceIsSet}
            type="date"
            min={props.currentDate()}
            id="EcheanceCorrection"
            name="EcheanceCorrection"
            value={props.item.echeance}
            onChange={(e) => props.handleChangeEcheanceCorrection(props.item.id, e.target.value)}
          />
          <FormText hidden={props.item.echeanceIsSet}>Renseigner l'écheance de la correction</FormText>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="ActionCorrective">Action corrective</Label>
            <Input valid={props.item.actionCorrectiveIsSet} invalid={!props.item.actionCorrectiveIsSet}
              type="textarea"
              id="actionCorrective"
              name="actionCorrective"
              value={props.item.actionCorrective}
              onChange={(e) => props.handleChangeActionCorrective(props.item.id, e.target.value)}
            />
            <FormText hidden={props.item.actionCorrectiveIsSet}>Renseigner l'action corrective</FormText>
          </FormGroup>
        </Col>
        {/**Echéance action corrective**/}
        <Col md={{ size: '6', offset: 6 }}>
          <Label for="EcheanceCorrection">Echéance action(s) corrective(s)</Label>
          <Input md={"auto"} valid={props.item.echeanceActionCorrectiveIsSet} invalid={!props.item.echeanceActionCorrectiveIsSet}
            type="date"
            placeholder="champ non-obligatoire"
            min={props.currentDate()}
            id="EcheanceCorrection"
            name="EcheanceCorrection"
            value={props.item.echeanceActionCorrective}
            onChange={(e) => props.handleChangeEcheanceActionCorrective(props.item.id, e.target.value)} />
          <FormText hidden={props.item.echeanceActionCorrectiveIsSet}>Renseigner l'échéance de l'action corrective</FormText>
        </Col>
      </Row>
      <Row inline>
        <Col md={12}>
          <Label for="Cause">Acteur</Label>
          <SelectComp outline onChange={(e) => props.handleSelectComp(e, props.item.id)} options={ActeurListSelect} />
          <FormText hidden={props.item.idActeurIsSet}>Choisissez un acteur</FormText>
        </Col>
      </Row>
      </Col>
    </Form>
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
        idActeurIsSet: false,
        echeance: '',
        echeanceIsSet: false,

        hasError: '',
        errorMessage: '',
        responseSubmit: '',

        dataStruc: [],
        nestedModal2:'',
        selectedAnalyseIndex: null,
        selectedAnalyse: null,

        unAutorize: false,
        libelleProcessus: '',
        libelleFamille: '',
        libelleSource: '',
        libelSupp:null,
         
        // use to validate form
        isValide:null,
        incorrectField:[]
    }

    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleNested2 = this.toggleNested2.bind(this);
    this.toggleNested3 = this.toggleNested3.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitValidation = this.handleSubmitValidation.bind(this);
    this.handleSelectComp = this.handleSelectComp.bind(this);
    this.currentDate = this.currentDate.bind(this);
    this.handleModifyAnalyse = this.handleModifyAnalyse.bind(this);
    this.handleValidModifyAnalyse = this.handleValidModifyAnalyse.bind(this);
    this.newAnalyse = this.newAnalyse.bind(this);
    this.toggleToolTips = this.toggleToolTips.bind(this);


    this.handleChangeDelete = this.handleChangeDelete.bind(this);
    this.handleChangeActionCorrective = this.handleChangeActionCorrective.bind(this);
    this.handleChangeEcheanceActionCorrective = this.handleChangeEcheanceActionCorrective.bind(this);
    this.handleChangeEcheanceCorrection = this.handleChangeEcheanceCorrection.bind(this);
    this.handleChangeCause = this.handleChangeCause.bind(this);
    this.handleChangeCorrection = this.handleChangeCorrection.bind(this);
    this.handleAddAction = this.handleAddAction.bind(this);
    this.handleDependanceField = this.handleDependanceField.bind(this);
    this.handleDependanceFieldCorrectionChange=this.handleDependanceFieldCorrectionChange.bind(this);
    this.handleValideAnalyse=this.handleValideAnalyse.bind(this);


  };

handleValideAnalyse()
{
  // Parcours dataStruc et permet de recuperer 
  // les champs qui ne sont pas 
  // correctement renseigner
  // un fois que ces champs sont recuperer
  // retourne un objet

  var allIsCorrect = [];
  var isCorrect = true;
  var formFieldMissFill = [];

  if (this.state.dataStruc.length === 0) {
    var obje = { isValide: false, incorrectField: formFieldMissFill }
    return obje
  }
  else {
    this.state.dataStruc.map(el => {
      if (!el.echeanceIsSet) {

        isCorrect = false;
        var obj = {
          labelle: "Echeance",
          libelleAt: "Analyse N° " + el.libelleAt
        }
        formFieldMissFill.push(obj)
      }
      if (!el.echeanceActionCorrectiveIsSet) {

        isCorrect = false;
        var obj_ = {
          labelle: "Echeance action corrective",
          libelleAt: "Analyse N° " + el.libelleAt
        }
        formFieldMissFill.push(obj_)

      }
      //pour eviter un doublon lors de l'ajout de la correction 
      // pour la correction
      var correctionIsAdd = false

      //Si correction renseignée, 
      //désactiver le caractère obligatoire des ‘‘Causes’’ et 
      if (!el.correctionIsSet && !el.causeIsSet) {
        isCorrect = false;
        var obj3 = {
          labelle: "Correction",
          libelleAt: "Analyse N° " + el.libelleAt
        }
         obj3 = {
          labelle: "Cause",
          libelleAt: "Analyse N° " + el.libelleAt
        }
        formFieldMissFill.push(obj)
        correctionIsAdd = true
      }
      //Si correction renseignée, 
      //‘‘Actions correctives’’. 
      // Ne pas le faire dans le cas contraire. 
      if (!el.correctionIsSet && !el.actionCorrectiveIsSet) {
        isCorrect = false;
        if (!correctionIsAdd) {
          var obj = {
            labelle: "Correction",
            libelleAt: "Analyse N° " + el.libelleAt
          }
        }
        var obj = {
          labelle: "Cause",
          libelleAt: "Analyse N° " + el.libelleAt
        }
        formFieldMissFill.push(obj)
      }
      //I WANT FIND WHY I LEAVE THIS BLANK 
      if ((el.correctionIsSet === false) && (el.causeIset === false) && (el.echeanceIsSet === false)) {

      }
      //FIN VALIDATION ACTION CORRECTIVE ET CORRECTION
      if (el.idActeurIsSet === false) {
        isCorrect = false;
        var obj = {
          labelle: "Acteur",
          libelleAt: "Analyse N° " + el.libelleAt
        }
        formFieldMissFill.push(obj)
      }
      allIsCorrect.push(isCorrect);

    })
    var boolfinal = true;
    if (allIsCorrect.length === 0) {
      var obje = { isValide: true, incorrectField: [] };
      return obje;
    } else
      allIsCorrect.map(el => {
        boolfinal = boolfinal && el;
      })
    var obje = { isValide: boolfinal, incorrectField: formFieldMissFill };
    return obje
  }


}

handleDependanceField(todo,field)
{

  if (todo[field].trim() === "" ||  todo[field] === null) {
    todo[field+"IsSet"] = false
  } 

  if(!todo.correctionIsSet && todo[field+"IsSet"]===false)
  {
    todo[field+"IsSet"] = false
  }
  if( (todo[field].trim() === "" ||  todo[field] === null ) && todo.correctionIsSet) 
  {
    todo[field+"IsSet"] = true
  } 
  if (todo[field].trim() !== ""  &&  todo[field] !== null )  {
    todo[field+"IsSet"] = true
  }  
  if (todo[field].trim() !== ""  &&  todo[field] !== null )  {
    todo[field+"IsSet"] = true
  } 

}


handleDependanceFieldCorrectionChange(todo,field)
{
  if( todo[field] === null)
  {
    todo[field+"IsSet"] = false
  }else{    
      
      if(( todo[field].trim() === "" ) && !todo.correctionIsSet) {
        todo[field+"IsSet"] = false
      } 
      else
      if( (todo[field].trim() !== "" &&  todo[field] !== null ) && todo.correctionIsSet===false) {
        todo[field+"IsSet"] = true
      }
    }

}

  //*to do inspire dynamic  **/
  //DELETE ACTION  and change 
  //analyse number dynamicaly

  handleChangeDelete(id) {
    var aux = [];
    if (this.state.dataStruc.length !== 0) {

var      updatedTodos = this.state.dataStruc.map((todo, index) => {
        
        console.log(id)
        if(todo.id===id){
        this.setState({libelSupp:todo.libelleAt})
        }
        if (todo.id !== id) {
          console.log("differentId====>" + id)
          console.log("before===>" + todo.libelleAt);
          // todo.libelleAt = index + 1;
          console.log("after===>" + todo.libelleAt);
          aux.push(todo)
        }
      })
    }
    if (aux.length !== 0) {
      console.log("in cascade")
      var aux2 = []
      aux.map((todo, index) => {
        console.log(" cascade de todo ======>" + todo.id, index)
        todo.libelleAt = index + 1
        aux2.push(todo)
      })
      this.setState({ dataStruc: aux2 })
    }
    else this.setState({ dataStruc: aux })
    this.toggleNested2()
  }

  //Action Corrective
  handleChangeActionCorrective(id, textValue) {
    this.setState(prevState => {
      const updatedTodos = prevState.dataStruc.map(todo => {
        if (todo.id === id) {
          todo.actionCorrective = textValue
          this.handleDependanceField(todo,"actionCorrective")
        }
        return todo
      })
      return {
        dataStruc: updatedTodos
      }
    })
  }

  //Causes
  handleChangeCause(id, textValue) {
    this.setState(prevState => {
      const updatedTodos = prevState.dataStruc.map(todo => {
        if (todo.id === id) {
          todo.cause = textValue
          this.handleDependanceField(todo,"cause")
        }
        return todo
      })
      return {
        dataStruc: updatedTodos
      }
    })
  }


  //Correction
  handleChangeCorrection(id, textValue) 
  {
    this.setState(prevState => {
      const updatedTodos = prevState.dataStruc.map(todo => {
        if (todo.id === id) {
          todo.correction = textValue
          if(todo.correction===null  )
          {
            todo.correctionIsSet=false;
            this.handleDependanceFieldCorrectionChange(todo,"cause")
            this.handleDependanceFieldCorrectionChange(todo,"actionCorrective")
          } else
          if (todo.correction.trim() === "") 
          {
            todo.correctionIsSet=false;
            this.handleDependanceFieldCorrectionChange(todo,"cause")
            this.handleDependanceFieldCorrectionChange(todo,"actionCorrective")

          } 
          else{ 
            todo.correctionIsSet = true;
            todo.causeIsSet=true;
            todo.actionCorrectiveIsSet=true;
            //met l'echeance action au vert 
            //si la correction est renseignée
            todo.echeanceActionIsSet=true;
          }
        }
        return todo;
      })
      return {
        dataStruc: updatedTodos
      }
    })
  }



  //Echeance correction
  handleChangeEcheanceCorrection(id, textValue) {
    this.setState(prevState => {
      const updatedTodos = prevState.dataStruc.map(todo => {
        if (todo.id === id) 
        {
          todo.echeance = textValue;
          if (todo.echeance.trim() !== "" &&  todo.echeance !== null) {
            todo.echeanceIsSet = true
            
          } 
          if(todo.correctionIsSet){
             todo.echeanceIsSet = true;
          }
          else todo.echeanceIsSet = false;
          
        }
        return todo
      })
      return {
        dataStruc: updatedTodos
      }
    })
  }


  //Echeance Action corrective
  handleChangeEcheanceActionCorrective(id, textValue) {
    this.setState(prevState => {
      const updatedTodos = prevState.dataStruc.map(todo => {
        if (todo.id === id) {
          todo.echeanceActionCorrective = textValue ;
          if (todo.echeanceActionCorrective.trim() !== "" &&  todo.echeanceActionCorrective !== null) {
            todo.echeanceActionCorrectiveIsSet = true

          } else todo.echeanceActionCorrectiveIsSet = false;
        }
        return todo
      })
      return {
        dataStruc: updatedTodos
      }
    })
  }

  handleAddAction() 
  {
    var aux = this.state.dataStruc;
    var data = {
      id: Date.now(),
      cause: null,
      //echeance ===> echeance correction
      echeance: null,
      //echeance2 ====> echeance action corrective dans la bd
      echeanceActionCorrective: false,
      correction: null,
      actionCorrective: null,
      idActeurDelegataire: Auth.getUsername(),
      idActeur: null,
      libelleAt: this.state.dataStruc.length + 1,
      echeanceIsSet:false,
      correctionIsSet: false,
      causeIsSet: false,
      actionCorrectiveIsSet: false,
      echeanceActionIsSet: false,
      idActeurIsSet:false,
      idFnc:this.state.idFnc,
      idProcessus:this.state.idProcessus
    }
    aux.push(data);
    this.setState({
      dataStruc: aux
    })
  }

  ///*****///****///
  handleSelectComp = (selectOption, id) => {
    this.setState(prevState => {
      const updatedTodos = prevState.dataStruc.map(todo => {
        if (todo.id === id) {
          todo.idActeur = selectOption.value
          if (selectOption.value.trim() !== "" && selectOption.value !== null) {
            todo.idActeurIsSet = true

          } else todo.idActeurIsSet = false;
        }
        return todo
      })
      return {
        dataStruc: updatedTodos
      }
    })
  }


  toggleToolTips() {
    this.setState(prevState => ({
      tooltipOpen: !prevState.tooltipOpen
    }))
  }

  createAnalyse = event => {
    event.preventDefault();
    const newItem = {
      idFnc: this.state.idFnc,
      processus: this.state.idProcessus,
      actionCorrective: this.state.actionCorrective,
      correction: this.state.correction,
      echeance: this.state.echeance,
      cause: this.state.cause,
      /// TODO A RECUPERER DANS LA SESSION
      idActeurDelegataire: Auth.getUsername(),
      idActeur: this.state.idActeur,
      libelleAt: this.state.libelle
    };

    this.setState(prevState => ({
      dataStruc: prevState.dataStruc.concat(newItem),
      libelle: prevState.libelle + 1
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
    this.setState({ isLoaded: false });

    
      await fetch(ConfigUrl.basePath+'/validationRoutage/fnc',
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
            "idFnc": this.state.idFnc,
            "statutRoutage": this.state.valRoutage,
            "numeroId": this.state.numeroId,
            "libelleProcessus": this.state.libelleProcessus,
            "libelleFamille": this.state.libelleFamille,
            "libelleSoure": this.state.libelleSource,
            "descriptionFNC": this.state.descriptionFnc,
            "qualification": this.state.qualification
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
            nestedModal: true,
          });
          console.log(this.state.selected);
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



  handleSubmit = async e => {
    
    
   var obje= this.handleValideAnalyse()

    if(!obje.isValide){

     
      this.toggleNested3()

    }else{
    e.preventDefault();
    console.log(this.state.dataStruc);
    await fetch(ConfigUrl.basePath+'/createTraitement/fnc',
      {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "data": this.state.dataStruc,
          "numeroId": this.state.numeroId,

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
      dataStruc: [].concat(updatedItems),
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
        item.idFnc = this.state.idFnc;
        item.processus = this.state.idProcessus;
        item.actionCorrective = this.state.actionCorrective;
        item.correction = this.state.correction;
        item.echeance = this.state.echeance;
        item.cause = this.state.cause;
        //TODO RECUPERER LA VALEUR DANS LA SESSION
        item.idActeurDelegataire = Auth.getUsername();
        item.idActeur = this.state.idActeur;
        item.libelleAnalyse = itemId;
      };
      return item;
    });
    this.setState(prevState => ({
      dataStruc: prevState.dataStruc.map(el => (el.libelleAt !== updatedItems.libelleAt ? { ...el } : updatedItems))
    }));
  }

  toggleNested2() {
    this.setState({
      nestedModal2: !this.state.nestedModal2
    });
  }

  toggleNested3() 
  {
    this.setState({
      nestedModal3: !this.state.nestedModal3
    });
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

    })

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
    this.setState({ dataStruc: [] })
  }
  async componentDidMount() {
    await fetch(ConfigUrl.basePath+"/consult/fnc",
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
            this.setState({
              isLoaded: true,
              errorMessage: "Accès refuser !",
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
    if (this.props.match.params.idFnc !== undefined) {
      console.log("-------->idfnc", this.props.match.params.idFnc)
      const fiche = this.state.responseToPost.find(el => el.numeroId === this.props.match.params.idFnc)
      if (fiche !== undefined) {
        this.toggle();
        this.setState({
          idProcessus: fiche.idProcessus,
          numeroId: fiche.numeroId,
          descriptionFnc: fiche.descriptionFnc,
          idFnc: fiche.idFnc,
          qualification: fiche.qualification,
          libelleFamille: fiche.libelleFamille,
          libelleSource: fiche.libelleSource,
          libelleProcessus: fiche.libelleProcesus
        });
      }
    }
  }

  render() {
    //ZONE POUR LES AFFICHAGES CONDITIONNELS
    const buttonDemarrerAna = <Button size="lg" style={{backgroundColor:'#d9541e' ,color :"white" }} color="#d9541e"  block>{'Demarrer l\'analyse'}</Button>
    const buttonSoumettre = <Button color="danger" size="lg" onClick={this.handleSubmitValidation} block>
      Soumettre la fiche pour correction
  </Button>
    const textSuppression=this.state.dataStruc.length===0 ? " . Vous avez supprimer toutes les analyses ! " : ". Mise à jour de la numérotation des analyses "
    const conditionnalBoutton = (this.state.valRoutage) ? buttonSoumettre : buttonDemarrerAna
    var response = (this.state.isLoaded) ? this.state.responseSubmit : <React.Fragment><Loader></Loader><p style={{ textAlign: 'center' }}>Chargement en cours...</p></React.Fragment>
    const AnalyseItem_ = this.state.dataStruc.length!==0 
                  ? 
                    this.state.dataStruc.map(item => <AnalyseItem key={item.id} item={item} 
                    handleChangeCorrection={this.handleChangeCorrection}
                    handleChangeEcheanceCorrection={this.handleChangeEcheanceCorrection} 
                    handleChangeEcheanceActionCorrective={this.handleChangeEcheanceActionCorrective}
                    handleSelectComp={this.handleSelectComp} currentDate={this.currentDate} 
                    handleChangeDelete={this.handleChangeDelete} 
                    handleChangeCause={this.handleChangeCause}
                    handleChangeActionCorrective={this.handleChangeActionCorrective}/>)
                  : <React.Fragment><Col style={{marginTop:"18%"}} md={12}><h2 style={{ textAlign: "center" }} >Aucune analyse créée  {' '}
                    <Button outline color="none" onClick={this.handleAddAction}>
                            <FontAwesomeIcon
                              icon="plus-circle"
                              color="green"
                              size="5x"
                              title="Ajouter une analyse "
                            />
                          </Button></h2>
                  </Col>
                  </React.Fragment>

    const invalidFill= this.state.dataStruc.length===0 ? "Veuillez creer une analyse avant de soummettre" : "Analyse incorrecte. Verifier tous les champs avant de soumettre"

    ////LIBRARY//////////////////////////////////////////////
    library.add(faPen, faBan, faTrash, faPlusCircle, faExclamationTriangle);
    ////////////////////////////////////////////////////////



    //ANALYSE



    if (this.state.unAutorize) {
      return (<Authorization />)
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
            style={{ maxWidth: '1600px', width: '80%' }}
            centered
            aria-labelledby="example-modal-sizes-title-lg"
            backdrop="static"
          >             
          <TabSwitcher>
            <ModalHeader toggle={this.toggle}>Créer le plan d'action</ModalHeader>
            <ModalBody>
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
                        <FormGroup check style={{ color: 'red' }}>
                          <Row>
                            <Col md={{ size: '2' }}>
                              <Label check>
                                <span id="TooltipExample">
                                  <Input type="checkbox" name="radio1" onChange={e => {
                                    this.setState(prevState => ({
                                      valRoutage: !prevState.valRoutage
                                    }));
                                    console.log(e.target.value)
                                  }} />{' '}Routage incorrect
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
                    <Row>
                      <Col>
                        <small style={{ textAlign: "center" }}>
                          <Button outline color="success" onClick={this.handleAddAction}>
                            <FontAwesomeIcon
                              icon="plus-circle"
                              color="green"
                              size="md"
                            />{" Ajouter"}  
                          </Button>
                          {"   "} Nombre d'analyse : {this.state.dataStruc.length}
                        </small>
                      </Col>
                      {/* <Col>
                        <small style={{ textAlign: "center" }}>
                          <Button outline color="danger" onClick={this.handleAddAction}>
                            <FontAwesomeIcon
                              icon="trash"
                              color="red"
                              size="md"
                            />{' Tout supprimer'}
                          </Button>
                        </small>
                      </Col> */}
                    </Row>
                    <br></br>
                    <Col style={{ borderStyle: "inset", overflowY: "scroll", overflowX:"hidden", height: "600px" ,backgroundColor:"#E8E8E8"}}> {AnalyseItem_}</Col>
                   
                  </Form >
                  <Row>&nbsp;</Row>

                  <br></br>

                  <Tab id="1" md={1} padding="0px" maxStep={3} step="prev">
                    <Button>Retour</Button>
                  </Tab>
                </TabPanel>
            </ModalBody>
            <ModalFooter>
              <TabPanel whenActive={2}>
              <Button color="danger" onClick={this.handleSubmit} >
                {this.state.dataStruc.length > 1 ? "Soummettre les analyses" : "Soummettre l'analyse"}
              </Button>
              </TabPanel>
            
              <Button color="secondary" onClick={this.toggle}>
                Annuler
            </Button>
            </ModalFooter>
            </TabSwitcher>
          </Modal>
          <Modal isOpen={this.state.nestedModal}
            toggle={this.toggleNested}
            onClosed={this.state.closeAll ? this.toggle : undefined}
            centered
            size="sm">
            <ModalBody toggle={this.toggleNested} >{response  } </ModalBody>
          </Modal>
          <Modal isOpen={this.state.nestedModal2}
            toggle={this.toggleNested2}
            // onClosed={this.setState({nestedModal2:!this.state.nestedModal2})}
            centered
            size="sm">
            <ModalBody toggle={this.toggleNested2}>L'analyse N°  {this.state.libelSupp} supprimée {textSuppression} </ModalBody>
          </Modal>
          {/* //i was here  */}
          <Modal isOpen={this.state.nestedModal3}
            toggle={this.toggleNested3}
            // onClosed={this.setState({nestedModal2:!this.state.nestedModal2})}
            centered
            size="md">
            <ModalBody toggle={this.toggleNested3}>{invalidFill}</ModalBody>
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
                      qualification: rowInfo.original.qualification,
                      libelleFamille: rowInfo.original.libelleFamille,
                      libelleSource: rowInfo.original.libelleSource,
                      libelleProcessus: rowInfo.original.libelleProcesus
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