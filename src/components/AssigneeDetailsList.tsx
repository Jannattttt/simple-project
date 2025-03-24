import { useEffect, useState } from 'react';
import AssigneeTypes from '../assignee';
import AssigneeService from '../AssigneeService';
import { FaEdit, FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import AssigneeDetailsForm from './AssigneeDetailsForm';
import "../CSS/TodoList.css";
import { fetchAssignee } from '../api/assigneeService';
import { deleteAssignee } from '../api/assigneeService';
import { updateAssignee } from '../api/assigneeService';

const AssigneeDetailsList = () => {
    const [assignees, setAssignees] = useState<AssigneeTypes[]>(AssigneeService.getAssignees());
    const [editingAssigneeId, setEditingAssigneeId] = useState<number | null>(null);
    const [editedAssigneeFirstName, setEditedAssigneeFirstName] = useState<string>("");
    const [editedAssigneeLastName, setEditedAssigneeLastName] = useState<string>("");
    /* const [editedTodoDescription, setEditedTodoDescription] = useState<string>(""); */
    
     const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);

    const handleEditStart = (id: number, firstName: string, lastName: string) => {
        setEditingAssigneeId(id);
        setEditedAssigneeFirstName(firstName);
        setEditedAssigneeLastName(lastName);
        /* setEditedTodoDescription(description); */
    };

    const handleEditCancel = () => {
        setEditingAssigneeId(null);
        setEditedAssigneeFirstName("");
        setEditedAssigneeLastName("");
        /* setEditedTodoDescription(""); */
    };

    const handleEditSave = async (id: number) => {
        if (editedAssigneeFirstName.trim() !== "" && editedAssigneeLastName.trim() !== "") {
            const updatedAssignee = {
                id,
                firstName: editedAssigneeFirstName,
                /* description: editedTodoDescription, */
                lastName: editedAssigneeLastName, 
                createdBy: "Firdaus",
                modifiedBy: "Selom"
            };

            const response = await updateAssignee(id, updatedAssignee);

            setAssignees((prevAssignees) => prevAssignees.map((assignee) => (assignee.id === id ? response : assignee)));
            setEditingAssigneeId(null);
            setEditedAssigneeFirstName("");
            setEditedAssigneeLastName("");
            /* setEditedTodoDescription(""); */
        }
    };

    
    const handleDeleteAssignee = async (id?: number) => {
        if(id){
            const response = await deleteAssignee(id);
        AssigneeService.deleteAssignee(id);
        setAssignees((prevAssignees) => prevAssignees.filter((assignee) => assignee.id !== id));
        }
    };

    
      const loadAssignees = async () => {
        try {
          const data = await fetchAssignee();
          setAssignees(data);
        } catch (error) {
          setError("Failed to load assignees");
        } finally {
          setLoading(false);
        }
      };
      
      useEffect(() => {
        
    
        loadAssignees();
      }, []);

    return (
        <div className="todoContainer">
            <AssigneeDetailsForm setAssignees={setAssignees} />

            {assignees.map((assignee) => (
                <div className="items" key={assignee.id}>
                    {editingAssigneeId === assignee.id ? (
                        <div className="editedText">
                            <input
                                type="text"
                                value={editedAssigneeFirstName}
                                onChange={(e) => setEditedAssigneeFirstName(e.target.value)}
                                autoFocus
                            />
                            <input
                                type="text"
                                value={editedAssigneeLastName}
                                onChange={(e) => setEditedAssigneeLastName(e.target.value)}
                            />
                            {/* <textarea
                                value={editedTodoDescription}
                                onChange={(e) => setEditedTodoDescription(e.target.value)}
                            /> */}

                            <button onClick={() => handleEditSave(assignee.id)}>
                                <FaCheck />
                            </button>

                            <button className='cancelBtn' onClick={handleEditCancel}>
                                <GiCancel />
                            </button>
                        </div>
                    ) : (
                        <div className="editBtn">
                            <div>
                                <p>{assignee.lastName}</p>
                                <p>{assignee.firstName}</p>
                                {/* <p>{assignee.description}</p> */}
                            </div>
                            <button onClick={() => {if(assignee.id) return handleEditStart(assignee.id, assignee.lastName, assignee.firstName)}}>
                                <FaEdit />
                            </button>
                        </div>
                    )}

                    <button onClick={() => handleDeleteAssignee(assignee.id)}>
                        <RiDeleteBin5Fill />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default AssigneeDetailsList;
