import React, {Component} from "react"
import {render} from "react-dom"


class App extends Component {

    state ={
        title: "",
        description: "",
        tasks: [],
        id: ""
    }

    addTask = (e) => {
        if(this.state.id){
            fetch(`/api/tasks/${this.state.id}`,{
                method: "PUT",
                body: JSON.stringify(this.state),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({title: "", description:"", id:""})
                this.fetchTasks();
            })
        }else{
            fetch("/api/tasks",{
                method: "POST",
                body: JSON.stringify(this.state),
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: "Task Saved"});
                this.setState({title:"",description:""})
                this.fetchTasks();
            })
        }
        e.preventDefault();
    }

    componentDidMount = () => {
        this.fetchTasks();
    }

    fetchTasks = () => {
        fetch("/api/tasks")
        .then(res => res.json())
        .then(data => {
            this.setState({tasks: data})
            console.log(this.state.tasks)
        })
        .catch(err => console.log(err))
    }

    deleteTask = (id) => {
        if(confirm("Do you want to delete this task?")){
            fetch(`/api/tasks/${id}`,{
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: "Task Deleted"})
                this.fetchTasks();
            })
            .catch(err=>console.log(err))
        }
    }

    editTask = (id) => {
        fetch(`/api/tasks/${id}`)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            this.setState({
                title: data.title,
                description: data.description,
                id: data._id
            })
        })
        .catch(err=>console.log(err))
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name] : value
        })
    }

    render(){
        return(
            <div>
                {/* Navigation */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN stack</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" value={this.state.title} onChange={this.handleChange} type="text" placeholder="Task Title" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" value={this.state.description} onChange={this.handleChange} placeholder="Task Description" className="materialize-textarea"></textarea>
                                            </div>
                                        </div>
                                        <button className="btn light-blue darken-4" type="Submit">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task =>{
                                            return(
                                                <tr key={task._id}>
                                                    <td>
                                                        {task.title}
                                                    </td>
                                                    <td>
                                                        {task.description}
                                                    </td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={()=>this.deleteTask(task._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                        <button className="btn light-blue darken-4" onClick={()=>this.editTask(task._id)} style={{margin:"4px"}}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;