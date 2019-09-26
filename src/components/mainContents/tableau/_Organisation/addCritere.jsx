import React from "react"
import CritereItem from "./critereItem"

export default class TodoList extends React.Component {


    constructor(props) 
    {
        super(props)
        this.state = {
            todoData: [],
            lastId:0,
            files: []        
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.getFiles=this.getFiles.bind(this)

    }
    

    handleAdd(files) 
    {
        files.map(el => {
            const obj =
            {
                id: this.state.lastId,
                critere: el.critere,
                echeances: el.echeances,
            }
            console.dir(el.echeances)
            const auxTodo = this.state.todoData;
            this.setState(prevState => ({
                todoData: auxTodo.concat(obj), lastId: prevState.lastId + 1, todoText: '', files: null
            }))
        })
    }

    getFiles(files)
    {
        this.setState({ files: files })
        this.handleAdd(files)  
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