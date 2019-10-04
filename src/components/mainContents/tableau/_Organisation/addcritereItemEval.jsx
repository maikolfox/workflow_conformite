import React from "react"
import CritereItemEval from "./critereItemEval"

export default class TodoList extends React.Component {


    constructor(props) 
    {
        super(props)
        this.state = {
            critereEvalData: [],
            criteres: []        
        }
        this.handleEvaluation = this.handleEvaluation.bind(this)
        this.getCriteres=this.getCriteres.bind(this)
        this.handleAdd=this.handleAdd.bind(this)

    }
    

  handleAdd(criteres) 
  {
      criteres.map(el => {
          const obj =
          {
              "id": el.id,
              "critere": el.critere,
              "echeanceCritere": el.echeanceCritere,
              "idAt": el.idAt,
              "evaluation": el.evaluation,
              "dateCreation": el.dateCreation
            }
          const auxTodo = this.state.critereEvalData;
          this.setState(prevState => ({
               critereEvalData: auxTodo.concat(obj)//, lastId: prevState.lastId + 1, todoText: '', criteres: null
          }))
      })
  }

    getCriteres(criteres)
    {
        this.setState({ criteres: criteres })
        this.handleAdd(criteres)  
    }

    handleEvaluation = (id,value) => 
    {

        this.setState(prevState=>{
            const update=prevState.critereEvalData.map(elem=>{
                if(elem.id===id){
                    elem.evaluation=value
                }
                return elem

            })
            return {
                critereEvalData:update
            }
        })
        console.log(id)
    }

    render() 
    {
        const items = this.state.critereEvalData.map(item => (
            <CritereItemEval
                key={item.key}
                item={item}
                onChange={this.this.handleEvaluation}
            />
        ))
        return (
        <React.Fragment>
                {items}
        </React.Fragment>
        )
    }
}