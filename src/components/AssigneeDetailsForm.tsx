import React, { Dispatch, SetStateAction, useState } from 'react';
import AssigneeTypes from '../assignee';
import "../CSS/TodoForm.css";
import { createAssignee } from '../api/assigneeService';

interface PropTypes {
    setAssignees: Dispatch<SetStateAction<AssigneeTypes[]>>;
}

const AssigneeDetailsForm: React.FC<PropTypes> = ({/*  setTodos */ }) => {
    const [newFirstName, setNewFirstName] = useState<string>("");
    const [newLastName, setNewLastName] = useState<string>("");
    /* const [newTodoDescription, setNewTodoDescription] = useState<string>(""); */

    const handleAddAssignee = async () => {
        if (newFirstName.trim() !== "" && newLastName.trim() !== "" ) {
            //const newTodo = TodoService.addTodos(newTodoText, newTodoDescription, newAssignee);
            // setTodos((prevTodos) => [...prevTodos, newTodo]);
           
           const response = await  createAssignee({
                firstName: newFirstName,
                lastName: newLastName,
                createdBy: "user"
            } as AssigneeTypes)

            console.log(response)


            setNewFirstName("");
            setNewLastName("");
            /* setNewTodoDescription(""); */
            

        }
    };

    return (
        <div className="inputForm">
            <input
                type="text"
                value={newFirstName}
                onChange={(e) => setNewFirstName(e.target.value)}
                placeholder="Assignee First Name"
                autoFocus
            />

            <input
                type="text"
                value={newLastName}
                onChange={(e) => setNewLastName(e.target.value)}
                placeholder="Assignee Last Name"
            />

            {/* <textarea
                value={newTodoDescription}
                onChange={(e) => setNewTodoDescription(e.target.value)}
                placeholder="Description"
            /> */}

            <button onClick={handleAddAssignee}>Add Todo</button>
        </div>
    );
};

export default AssigneeDetailsForm;
