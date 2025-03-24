import React, { Dispatch, SetStateAction, useState } from 'react';
import TodoTypes from '../todo';
import "../CSS/TodoForm.css";
import { createTasks } from '../api/tasksService';

interface PropTypes {
    setTodos: Dispatch<SetStateAction<TodoTypes[]>>;
}

const TodoForm: React.FC<PropTypes> = ({/*  setTodos */ }) => {
    const [newTodoText, setNewTodoText] = useState<string>("");
    const [newAssignee, setNewAssignee] = useState<string>("");
    const [newTodoDescription, setNewTodoDescription] = useState<string>("");

    const handleAddTodo = async () => {
        if (newTodoText.trim() !== "" && newTodoDescription.trim() !== "" && newAssignee.trim() !== "") {
            //const newTodo = TodoService.addTodos(newTodoText, newTodoDescription, newAssignee);
            // setTodos((prevTodos) => [...prevTodos, newTodo]);
           
           const response = await  createTasks({
                title: newTodoText,
                assigneeName: newAssignee,
                description: newTodoDescription,
                createdBy: "user"
            } as TodoTypes)

            console.log(response)


            setNewAssignee("");
            setNewTodoText("");
            setNewTodoDescription("");
            

        }
    };

    return (
        <div className="inputForm">
            <input
                type="text"
                value={newAssignee}
                onChange={(e) => setNewAssignee(e.target.value)}
                placeholder="Assignee Name"
                autoFocus
            />

            <input
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                placeholder="Title"
            />

            <textarea
                value={newTodoDescription}
                onChange={(e) => setNewTodoDescription(e.target.value)}
                placeholder="Description"
            />

            <button onClick={handleAddTodo}>Add Todo</button>
        </div>
    );
};

export default TodoForm;
