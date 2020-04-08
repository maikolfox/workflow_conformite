import React  from "react";
import { faAngleDown,faAngleUp} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MediaAsset  from '../../../assets/MediaAsset'
import Loader from "../../../assets/Loader";
import ConfigUrl from '../../../assets/ConfigUrl'

import DateFormatTransform from "../../../assets/dateFormatTransform";
import displayNomPrenom from "../../../assets/displayNomPrenom";
import {

  Col,
  Row,Form,FormGroup,
  Modal,ModalBody,ModalFooter,ModalHeader,Button,Input,Collapse,Label
} from "reactstrap";



//composant pour gerer la modification des resultats
  class ModalModificationResultat extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        responseSubmit:"",
        hasError:false,
        isLoaded:false,
        modal: false,
        nestedModal:false,
        response:"",
        resultat_:this.props.resultat,
        precedent:this.props.resultat,
        acteurTraitant:this.props.acteurTraitant,
        responsableTraitement:this.props.responsableTraitement
      };
    
      this.toggle = this.toggle.bind(this);
      this.toggleNested = this.toggleNested.bind(this);

      this.handleSubmit=this.handleSubmit.bind(this);
    }
  
    handleSubmit = async e=>{
      e.preventDefault();
         await fetch(ConfigUrl.basePath+'/update_resultatTraitement/fnc',
          {
            method: 'POST',
            headers:
            {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "data":
              {  
                id: this.props.id,
                numeroId: this.props.numeroId,
                idActeurTraitant: this.props.idActeurTraitant,
                responsableTraitement: this.props.responsableTraitement,
                resultatModifier:this.state.resultat_,
                resultatPrecedent: this.state.precedent
              }
              }),
          }).then(res => res.json())
          .then(
            (result) => {
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
                responseSubmit:"Erreur lors de la communication avec le serveur : "+error.message,
                hasError: true
              });
            });         
        //const body = await response.text();
        // this.setState({ responseToPost: JSON.parse(body) });  
        console.log(this.state.responseSubmit);
        this.toggle();
    }
    toggleNested() {
      this.setState({
        nestedModal: !this.state.nestedModal
      });
    }

    toggle() {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    }
    
    componentDidMount(){
      this.setState(
      {
        resultat_: this.props.resultat,
        precedent :this.props.resultat
      }
      )
    }
    
    render() {
      var response=(this.state.isLoaded) ? this.state.responseSubmit : <React.Fragment><Loader></Loader><p style={{textAlign:'center'}}>Chargement en cours...</p></React.Fragment>
      return (
        <div>
          <Button color="danger" onClick={this.toggle}>Modifier le resultat</Button>
          <Modal 
          isOpen={this.state.modal} 
          toggle={this.toggle} 
          className={this.props.className}
          centered
          size="lg"
          backdrop="static">
            <ModalHeader toggle={this.toggle}>Modification du resultat du plan d'action N° {this.props.numeroAna}</ModalHeader>
            <ModalBody>
                  <Input min={10} type="textarea" onChange={e=>{this.setState({resultat_: e.target.value})}} value={this.state.resultat_}></Input> 
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={this.handleSubmit}>Valider la modification du résultat</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Annuler</Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={this.state.nestedModal}
          toggle={this.toggleNested}
          onClosed={this.state.closeAll ? this.toggle : undefined}
          centered
          size="sm"
          backdrop="static"
        >
          <ModalHeader toggle={this.toggleNested} >{response}</ModalHeader>
        </Modal>
        </div>
      );
    }
  }  

  

function CritereItemContent(props)
{
  return (
      <ul>
      <li>{props.critere}&nbsp;<br />
      <strong>Echéance évaluation :</strong>&nbsp; {DateFormatTransform(props.echeanceCritere)}
      <p><strong>Date de fin :</strong>&nbsp; {DateFormatTransform(props.dateFinAnalyse)}</p></li>
      </ul>
  )
}




class AnalyseContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false ,
      
    };
    this.toggleCollapse = this.toggleCollapse.bind(this);
  }
    toggleCollapse() {
      this.setState(state => ({ collapse: !state.collapse }));
    }
   

  render() {
    library.add(faAngleDown);
    library.add(faAngleUp);
    var downloadFileList= (this.props.dataAna[0].listFile.length!==0) 
    ? this.props.dataAna[0].listFile.map(el=>(
     <Col> <a href="#" onClick={e=>{
        fetch(ConfigUrl.basePath+"/download/"+el.nomFichier)
        .then(response => {
          response.blob().then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = el.nomFichier;
            a.click();
          })
      })}
    }>{el.nomFichier}</a><br/><br/></Col>)) 
    : "Aucune pièce jointe"
    const listCri = this.props.dataAna.map(el => <CritereItemContent critere={el.critere} echeanceCritere={el.echeanceCritere} dateFinAnalyse={el.dateFinAnalyse} />);
    return (
    <React.Fragment>
                <Row md={12} style={{
                backgroundColor:"#061c27",
                color: "white" ,
                marginBottom:"15px" ,
                height:"auto" , 
                size:"1em"}} 
                onClick={this.toggleCollapse} >
                  <Col md={10}>Plan d'action N° {this.props.item.libelletAt}</Col>
                  <Col  md="2"><span style={{marginLeft :"90%"}}> <FontAwesomeIcon
                icon={this.state.collapse ? "angle-up" : "angle-down"}
                color="#d9541e"
                size="2x"
            /></span></Col> </Row>
      <Collapse isOpen={this.state.collapse}>
      <Col md={12}>
      <MediaAsset libelle="Acteur traitant" content={(this.props.dataAna !== undefined) ? displayNomPrenom(this.props.dataAna[0].idActeur) : ""}></MediaAsset>
      <MediaAsset libelle="Cause" content={(this.props.dataAna !== undefined) ? this.props.dataAna[0].cause : ""}></MediaAsset>
      <MediaAsset libelle="Correction" content={(this.props.dataAna !== undefined) ? this.props.dataAna[0].correction :""}></MediaAsset>
      <MediaAsset libelle="Action corrective" content={(this.props.dataAna !== undefined) ? this.props.dataAna[0].actionCorrective:""}></MediaAsset>
      <MediaAsset libelle="Resultat traitement" content={ (this.props.dataAna[0] !== undefined) ? this.props.dataAna[0].resultatTraitement :""}   ></MediaAsset>
      <MediaAsset libelle="Pièces jointes ( Cliquer sur le lien pour télécharger la pièce jointe )" content={downloadFileList}  ></MediaAsset>
      <div>
        <MediaAsset libelle="Critères" content= {listCri} ></MediaAsset>
        </div>
      <Row>&nbsp;</Row>
    {/**Evaluation block */}
         <Col md={12}> 
         <Label>Evaluation de l'efficacité </Label>
         <Input type="select" onChange={e => { console.log(e.target.value)
            //this.setState({ evaluationEff: e.target.value })
         this.props.handleEvaluation(this.props.dataAna[0].idCritere,e.target.value,this.props.dataAna[0].idActeurDelegataire)
         }}>
         {/* handleEvaluation={this.handleEvaluation} 
                handlePieceJPointe={this.handlePieceJPointe} */}
            <option value="" default > </option>
            <option value="Efficace" >Efficace</option>
            <option value="Inefficace" >Inefficace</option>
          </Input>
          
          <Row>&nbsp;</Row>
          <Label>Preuve</Label>
          <Input type="input" onChange={e => { this.setState({ preuve: e.target.value }) }}>
          </Input>
          <Row>&nbsp;</Row>
          <Label>Pièce jointe</Label>
          <Input type="file" accept="application/pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.wordprocessingml.document" name="file" multiple onChange={this.onChangeHandler} />

          <Row>&nbsp;</Row>
          </Col>
    {/**end evaluation bloc */}
      
        <br />
        {this.props.evalComponent}
        <ModalModificationResultat 
        numeroAna={this.props.item.libelletAt} 
        numeroId={this.props.numeroId} 
        responsableTraitement={this.props.dataAna[0].idActeur} 
        idActeurTraitant={this.props.dataAna[0].idActeurDelegataire} 
        id={this.props.dataAna[0].id} 
        resultat={this.props.dataAna[0].resultatTraitement} />
        <hr></hr>
          
        
      </Col>
      </Collapse>
      <br></br>
    </React.Fragment>);
  }
//add a handler to modify the parent state
}
export default AnalyseContent;

class Details extends React.Component {

  constructor(props) {
    super(props);
    this.state={collapseDet:false}
    this.toggleCollapseDetails = this.toggleCollapseDetails.bind(this);

  }

  toggleCollapseDetails() {
    this.setState(state => ({ collapseDet: !state.collapseDet }));
  }
  render() {
    return (
      <React.Fragment><Row md={12} style={{
        backgroundColor: "#061c27",
        color: "white",
        marginBottom: "15px",
        height: "auto",
        size: "1em"
      }} onClick={this.toggleCollapseDetails}><Col md={10}>Détails (Cause , Correction ,Action corrective) </Col><Col md="2"><span style={{
        marginLeft: "100%"
      }}> <FontAwesomeIcon icon="angle-down" color="#d9541e" size="1x" /></span></Col> </Row>
        <Collapse isOpen={this.state.collapseDet}>
          <MediaAsset libelle="Cause" content={(this.props.data !== undefined) ? this.props.data[0].cause : ""}></MediaAsset>
          <MediaAsset libelle="Correction" content={(this.props.data !== undefined) ? this.props.data[0].correction : ""}></MediaAsset>
          <MediaAsset libelle="Action corrective" content={(this.props.data !== undefined) ? this.props.data[0].actionCorrective : ""}></MediaAsset>
        </Collapse>
      </React.Fragment>);
  }

}
export {Details}