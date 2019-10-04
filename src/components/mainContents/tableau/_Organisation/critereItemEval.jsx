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





function critereItemEval(props) {
  // const evalSelect = evalCritere.map((el, index) => {
  //   return (
  //     <option key={index} value={el.value}>{el.libelle} </option>)
  // })
  return (
    <Row>
      <Col md={12} >
        <div><p>{props.item.critere}&nbsp;<br />
        <strong>Echéance</strong> :&nbsp; {DateFormatTransform(props.item.echeanceCritere)}</p></div>
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
      </Col>
    </Row>
  );
}
export default critereItemEval;
