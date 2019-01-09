import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

let style = {
    marginTop: '30px'
}

const AppTitle = ({count}) => {
    return (
        <div>
            <div>
                <h1>AwesomeDo: ({count})</h1>
            </div>
        </div>
    )
}

const TaskForm = ({addTodoFunc}) => {
    let input

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            addTodoFunc(input.value)
            input.value = ''
            }}>
            <input className="form-control col-md-12" ref={node => {
                input = node
            }} />
            <br />
        </form>
    )
}

const Todo = ({todo, removeTodoFunc}) => {
    return (
        <div className="list-group-item" onClick={() => {
            removeTodoFunc(todo.id)
        }}>{todo.text}</div>
    )
}

const TodoList = ({todos, removeFunc}) => {
    const todoNode = todos.map((todo) => {
        return (
            <Todo todo={todo} key={todo.id} removeTodoFunc={removeFunc}/>
        )
    })
    return (
        <div className="list-group" style={style}>{todoNode}</div>
    )
}

// window.id = 0
class TodoApp extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            data: []
        }
        this.apiUrl = '//57b1924b46b57d1100a3c3f8.mockapi.io/api/todos'
    }

    componentDidMount() {
        axios.get(this.apiUrl)
            .then((res) => {
                this.setState({data: res.data})
            })
    }

    addTodo(val) {
        const todo ={text: val}
        axios.post(this.apiUrl, todo)
            .then((res) => {
                this.state.data.push(res.data)
                this.setState({data: this.state.data})
            })
    }

    handleRemove(id) {
        const remainder = this.state.data.filter((todo) => {
            if(todo.id !== id) return todo
        })

        axios.delete(`${this.apiUrl}/${id}`)
            .then((res) => {
                this.setState({data: remainder})
            })
    }

    render() {
        return (
            <div>
                <AppTitle count={this.state.data.length} />
                <TaskForm addTodoFunc={this.addTodo.bind(this)} />
                <TodoList
                    todos={this.state.data}
                    removeFunc={this.handleRemove.bind(this)} />
            </div>
        )
    }
}

ReactDOM.render(<TodoApp />, document.getElementById('container'))