import React, { useState } from 'react';
import TodoForm from "./TodoForm";
import Todo from "./Todo";


function TodoList() {
    //-- Declaring a state variable with an empty array.
    //-- adding functions allowing us to update
    const [todos, setTodos] = useState([]);

    //-- Function to add new Task
    const addTodo = todo => {
        //-- Checks to see if no text or text has whitespace
        if (!todo.text || /^\s*$/.test(todo.text)) {
            return;
        }
        //-- Creates a new array by combining the to-do object and the new to-do is added to the top of the list
        const newTodos = [todo, ...todos];
        //-- Updates the todos state with the newly create array
        setTodos(newTodos);
    };

    // Edit task
    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        setTodos(prevState => prevState.map(item => (item.id === todoId ? newValue : item)))
    }



    // Creating a function that will delete task
    const removeTodo = id => {
        const removeArr = [...todos].filter(todo => todo.id !== id)

        setTodos(removeArr)
    }

    //-- Function for completed task
    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if(todo.id === id){
                todo.isComplete = !todo.isComplete
            }
            return todo
        })
        setTodos(updatedTodos);
    }


    return (
        <>
            <h1 className={'text-white pt-3 h1'}>What's the Plan for Today?</h1>
            <p className={'pb-3'}><small className={'text-light'}>Once completed, click on task.</small></p>
            {/*Renders component and passes the addTodo function as a prop on submit*/}
            <TodoForm onSubmit={addTodo} />
            <Todo  todos={todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo}/>
        </>
    );
}

export default TodoList;