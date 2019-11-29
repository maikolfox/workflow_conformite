import React from "react"
import "./index.css"

function TodoItem(props){

return(

   <div className="flex-container">
    <p>{props.item.name}</p>
  
    <div className="close_" onClick={(event=>props.deleteTodo(props.item.id))}>x</div>
    
  </div>
)


}
export default TodoItem