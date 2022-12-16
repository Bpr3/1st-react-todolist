import React from 'react';
import './ToDoList.css';

class ToDoList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        };
    }

    addToDo(newToDo,isDone = false) {
        this.setState({
            todos: [...this.state.todos, {title: newToDo, isDone: isDone}],
        });
    }

    deleteTodo(index) {
        let newTodos = [...this.state.todos];
        newTodos.splice(index, 1);

        this.setState({
            todos: newTodos
        });
    }

    toggleDone(index){
        let newTodos = [...this.state.todos];
        let todo = newTodos[index];
        todo.isDone = !todo.isDone;
        this.setState({
            todos: newTodos
        });
    }

    moveUp(index) {
        let newTodos = [...this.state.todos];
        if (index > 0) {
            let temp = newTodos[index - 1];
            newTodos[index - 1] = newTodos[index];
            newTodos[index] = temp;
            this.setState({
                todos: newTodos
            });
        }
    }

    moveDown(index) {
        let newTodos = [...this.state.todos];
        if (index < newTodos.length - 1) {
            let temp = newTodos[index + 1];
            newTodos[index + 1] = newTodos[index];
            newTodos[index] = temp;
            this.setState({
                todos: newTodos
            });
        }
    }

    render() {
        return (
            <div className="ToDoList">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    this.addToDo(this.input.value);
                }}>
                    <input
                        type="text"
                        ref={(input) => { this.input = input; }}
                        maxLength="60"

                    />
                    <button type="submit">Add To-Do</button>
                </form>
                <ul>
                    {this.state.todos.map((todo, index) => (
                        <li key={index} >
                            <div className={'title' + ' ' + (todo.isDone && 'struck')}>{todo.title}</div><br/>
                            <div className={'buttons'}>
                                <button onClick={()=>{this.deleteTodo(index);}}>Delete</button>
                                <button onClick={()=>{this.toggleDone(index);}}>{todo.isDone ? 'Undone' : 'Done'}</button>
                                <button onClick={()=>{this.moveUp(index);}}>&uarr;</button>
                                <button onClick={()=>{this.moveDown(index);}}>&darr;</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }


}

export default ToDoList;