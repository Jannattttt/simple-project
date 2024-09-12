import React, { Dispatch, SetStateAction, useState } from 'react';
import TodoService from '../TodoService';
import TodoTypes from '../todo';
import "../CSS/TodoForm.css";

interface PropTypes {
    setTodos: Dispatch<SetStateAction<TodoTypes[]>>;
}

const TodoForm: React.FC<PropTypes> = ({ setTodos }) => {
    const [newTodoText, setNewTodoText] = useState<string>("");
    const [newTodoDescription, setNewTodoDescription] = useState<string>("");

    const handleAddTodo = () => {
        if (newTodoText.trim() !== "" && newTodoDescription.trim() !== "") {
            const newTodo = TodoService.addTodos(newTodoText, newTodoDescription);
            setTodos((prevTodos) => [...prevTodos, newTodo]);
            setNewTodoText("");
            setNewTodoDescription("");
        }
    };

    return (
        <div className="inputForm">
            <input
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                placeholder="Add a Task"
                autoFocus
            />

            <textarea
                value={newTodoDescription}
                onChange={(e) => setNewTodoDescription(e.target.value)}
                placeholder="Add a Description"
            />

            <button onClick={handleAddTodo}>Add Todo</button>
        </div>
    );
};

export default TodoForm;
