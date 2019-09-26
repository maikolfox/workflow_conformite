import React from "react"
import "./index.css"

function critereItem(props){

return(

   <div className="flex-container">
    <p>{props.item.critere}</p>
    <p>{props.item.echeance}</p>
    {/* <input type="checkbox" 
      checked={ props.item.completed}
      onChange={(event=>props.onChange(props.item.id))}
    /> */}
    <div className="close_" onClick={(event=>props.deleteTodo(props.item.id))}>x</div>
    
  </div>
)


}
export default critereItem