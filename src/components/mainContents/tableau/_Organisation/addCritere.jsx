import React from "react"
import CritereItem from "./critereItem"

export default class TodoList extends React.Component {


    constructor(props) 
    {
        super(props)
        this.state = {
            todoData: [],
            lastId:0,
            criteres: []        
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.getCriteres=this.getCriteres.bind(this)

    }
    

    handleAdd(criteres) 
    {
        criteres.map(el => {
            const obj =
            {
                id: this.state.lastId,
                name: el.name,
                base64: el.base64,
            }
            console.dir(el.base64)
            const auxTodo = this.state.todoData;
            this.setState(prevState => ({
                todoData: auxTodo.concat(obj), lastId: prevState.lastId + 1, todoText: '', criteres: null
            }))
        })
    }

    getCriteres(criteres)
    {
        this.setState({ criteres: criteres })
        this.handleAdd(criteres)  
    }

    handleChange = id => 
    {

        this.setState(prevState=>{
            const update=prevState.todoData.map(elem=>{
                if(elem.id===id){
                    elem.completed=!elem.completed
                }
                return elem

            })
            return {
                todoData:update
            }
        })
        console.log(id)
    }


    handleDelete=id=>
    {
        var update=[];
        console.log("id",id)
        this.setState(prevState=>{
          prevState.todoData.map(elem=>{
                if(elem.id!==id) { update.push(elem) }
            })

            return {
                todoData:update
            }
        })
    }

    render() 
    {
        const items = this.state.todoData.map(item => (
            <CritereItem
                key={item.key}
                item={item}
                onChange={this.handleChange}
                deleteTodo={this.handleDelete}
            />
        ))
        return (
        <React.Fragment>
                <br/>
                
                 <button onClick={this.handleAdd}>Ajouter un Critère </button> 
                <br></br>
                {items}
        </React.Fragment>
        )
    }
}