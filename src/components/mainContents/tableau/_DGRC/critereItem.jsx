import React from "react";
import DateFormatTransform from "../../../assets/dateFormatTransform"
function critereItem(props) {
  
  return (
    <div className="flex-container">
      <p>{props.item.critere}&nbsp;<br/><br/>{DateFormatTransform(props.item.echeance)}</p>
      
      <div></div>
      <div
        className="close_"
        onClick={event => props.deleteTodo(props.item.id)}
      >
        x
      </div>
    </div>
  );
}
export default critereItem;
