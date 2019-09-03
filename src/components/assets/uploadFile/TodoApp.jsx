import React from "react"
import TodoItem from "./TodoItem"
import FileBase64 from 'react-file-base64';

export default class TodoList extends React.Component {


    constructor(props) {
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
    files.map(el=>{             
       const obj= 
        { 
           id: this.state.lastId, 
           name: el.name, 
           base64:el.base64,
        }
        console.dir(el.base64)
        const auxTodo=this.state.todoData;
       this.setState(prevState=>({todoData:auxTodo.concat(obj),lastId:prevState.lastId+1,todoText:'',files:null
       }))
    })
}

    getFiles(files){
        this.setState({ files: files })
    this.handleAdd(files)  
    }

    handleChange = id => {

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


    handleDelete=id=>{
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
            <TodoItem
                key={item.key}
                item={item}
                onChange={this.handleChange}
                deleteTodo={this.handleDelete}
            />
        ))
        return (
        <React.Fragment>
                
                <br/>
                {/* <input type="file" value={this.state.todoText} onChange={e=>{
                    this.setState({todoText:e.target.value})
                }} /> */}
                <FileBase64 
                multiple={ true }
                onDone={ this.getFiles.bind(this) } 
                />
                {/* <button onClick={this.handleAdd}>Add </button> */}
                <br></br>
                {items}
        </React.Fragment>
        )
    }
}