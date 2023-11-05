import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

//-- A functional component that receives props
const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {

    //-- Created a variable that creates an object with properties
    const [edit, setEdit] = useState({
        id: null,
        value: ''
    });

    //-- a function that takes a value, that call the update function with the edit.id and value and resets the edit state to its initial values
    const submitUpdate = value => {
        updateTodo(edit.id, value);
        setEdit({
            id: null,
            value: ''
        });
    };

    //-- if edit.id is not null, it means the user is in edit mode
    //-- returning the 'TodoForm' component with the edit object and the text to display in the form.
    //-- OnSubmit, it will fun the submitUpdate function
    if (edit.id !== null) {
        return <TodoForm edit={edit} text={edit.value} onSubmit={submitUpdate} />;
    }


    //-- using the map method to look through the todos array.
    return todos.map((todo, index) => (
        //-- a class name is based on whether a to-do is completed or not.
        // The key attribute is set to index to give each element a unique identify
        <div
            className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
            key={index}>
            {/*-- Task text & trigger for completeTodo function --*/}
            <div key={todo.id} onClick={() => completeTodo(todo.id)}>
                {todo.text}
            </div>
            {/*Delete & Edit Buttons Icons*/}
            <div className='icons'>
                {/*Delete Button*/}
                <button className={'btn btn-danger btn-sm p-1'} onClick={() => removeTodo(todo.id)}>
                    <RiCloseCircleLine className='delete-icon'/>
                </button>
                {/*Edit Button*/}
                <button className={'btn btn-warning ms-2 btn-sm p-1'} onClick={() => setEdit({ id: todo.id, value: todo.text })}>
                    <TiEdit className='edit-icon'/>
                </button>
            </div>
        </div>
    ));
};

export default Todo;