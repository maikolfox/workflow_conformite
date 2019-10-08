import React from "react";
import DateFormatTransform from "../../../assets/dateFormatTransform"
import {

  Col,
  Row,
  Table, Input
} from "reactstrap";

const evalCritere = [
  {
    "libelle": "éfficace",
    "value": "éfficace"
  }, {
    "libelle": "Inefficace",
    "value": "Inefficace"
  }]



{/* </Col>
      <Col md={6}>
        {/* <Input type="select"
          id="selectAgence"
          name="selectbasic"
          maxLength="600"
          minLength="100"
          value={(props.item.evaluation === null || props.item.evaluation === undefined) ? "" : props.item.evaluation}
          onChange={e => props.handleEvaluation(props.item.id, e.target.value)}>
          <option key="ab0" value="" default></option>
          {evalSelect}
        </Input> */}

function CritereItemContent(props) {
  return (
    <div><p>{props.critere}&nbsp;<br />
      <strong>Echéance :</strong>&nbsp; {DateFormatTransform(props.echeanceCritere)}</p>
      <p><strong>Date de fin :</strong>&nbsp; {DateFormatTransform(props.dateFinAnalyse)}</p>
      </div>

  )
}


function AnalyseContent(props){
  const listCri = props.dataAna.map(el => (
    <CritereItemContent critere={el.critere} echeanceCritere={el.echeanceCritere} dateFinAnalyse={el.dateFinAnalyse}/>
  ))
  return (
    <Row>
      <Col md={12} >
        <div>Numéro analyse : &nbsp;<h1>{props.item.libelletAt}&nbsp;</h1></div><br />
        <br/><br/>
        <div>Resultat traitement :</div>
        <div>{props.dataAna[0].resultatTraitement}</div>
        <br/><br/>
        <div>
          <div>Liste des critère</div>
          {listCri}
        </div>
        <br/>
      </Col>
    </Row>
  );
}
export default AnalyseContent;
