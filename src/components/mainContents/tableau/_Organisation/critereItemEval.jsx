import React  from "react";
import DateFormatTransform from "../../../assets/dateFormatTransform";
import {

  Col,
  Row,
  Modal,ModalBody,ModalFooter,ModalHeader,Button,Input
} from "reactstrap";

const evalCritere = [
  {
    "libelle": "éfficace",
    "value": "éfficace"
  }, {
    "libelle": "Inefficace",
    "value": "Inefficace"
  }]


  class ModalExample extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modal: false,
        resultat_:this.props.resultat,
        precedent:this.props.resultat
      };
  
      this.toggle = this.toggle.bind(this);
    }
  
    toggle() {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    }
    

    render() {
      return (
        <div>
          <Button color="danger" onClick={this.toggle}>modifier le resultat</Button>
          <Modal 
          isOpen={this.state.modal} 
          toggle={this.toggle} 
          className={this.props.className}
          centered
          size="lg"
          backdrop="static">
            <ModalHeader toggle={this.toggle}>Modification du resultat de l'analyse N° {this.props.numeroAna}</ModalHeader>
            <ModalBody>
                  <Input min={10} type="textarea" onChange={e=>{this.setState({resultat_: e.target.value})}} value={this.state.resultat_}></Input> 
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }
  }  

  

function CritereItemContent(props){

  return (
    <ul><li>{props.critere}&nbsp;<br />
      <strong>Echéance :</strong>&nbsp; {DateFormatTransform(props.echeanceCritere)}
      <p><strong>Date de fin :</strong>&nbsp; {DateFormatTransform(props.dateFinAnalyse)}</p></li>
      </ul>

  )
}




function  AnalyseContent(props){
  const listCri = props.dataAna.map(el => (
    <CritereItemContent critere={el.critere} echeanceCritere={el.echeanceCritere} dateFinAnalyse={el.dateFinAnalyse}/>
  ))
  return (
    <Row>
      <Col md={12} >
        <div>Numéro analyse : &nbsp;<h2>{props.item.libelletAt}&nbsp;</h2></div><br />
        <br/><br/>
        <div>Resultat traitement :</div> 
        <div>{props.dataAna[0].resultatTraitement}</div>
        <br/><br/>
        <div>
          <div>Liste des critère</div>
          {listCri}
        </div>
        <br/>
        <ModalExample numeroAna={props.item.libelletAt} resultat={props.dataAna[0].resultatTraitement}/>
        <hr></hr>
      </Col>
    </Row>
  );
}
export default AnalyseContent;
