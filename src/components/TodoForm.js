import React, {useState, useEffect, useRef} from "react";

//-- A function that takes a props
function TodoForm(props){
    //-- State a variable that is set to 'props.text' if exists,
    //-- if not it is an empty string.
    const [input, setInput] = useState(props.text || '');
    //-- Create a variable that represent the current ID for the to-do items.
    //-- Starts at 0, and will increment for every item submitted.
    const [currentId, setCurrentId] = useState(0);

    //-- Create a ref
    const inputRef = useRef(null)
    //-- Use the ref to focus on the input element when the component mounts
    useEffect(() => {
        inputRef.current.focus()
    })

    //-- This function runs when there is a change in the input
    const handleChange = e => {
        //-- captures the updated value of the input and stores in variable
        const updatedInput = e.target.value;
        //-- update the input state with the value stored in the variable.
        setInput(updatedInput);
    };

    //-- This function runs when form is submitted.
    const handleSubmit = e => {
        //-- prevents the page to fresh
        e.preventDefault();
        //-- generates a new ID for the upcoming to-do item.
        setCurrentId(currentId + 1);
        //-- calls the function as a prop and passes an object with two properties: id and text
        props.onSubmit({
            //-- Set the id property of the object to the current currentId.
            id: currentId,
            //-- Captures input and setting text property
            text: input
        });

        //-- Reset the input field for the next to-do item.
        setInput('');
    }



    return(
        <>
            {/*renders an HTML form */}
            {/*depending on if props.edit is true then classes will change. On form submit, it will run handleSubmit function */}
            <form className={props.edit ? "edit-todo-form" : "todo-form"} onSubmit={handleSubmit}>
                {/*The input that will onChange set the handleChange function*/}
                <input
                    type={"text"}
                    placeholder={"Add a todo"}
                    value={input}
                    name={"text"}
                    className={"todo-input"}
                    onChange={handleChange}
                    ref={inputRef}/>
                <button className="todo-button">
                    {/*if props.edit is true, display edit to-do or add to-do*/}
                    {props.edit ? "Edit todo" : "Add todo"}
                </button>
            </form>
        </>
    )
}

export default TodoForm;
