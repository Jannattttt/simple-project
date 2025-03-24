import { useEffect, useState } from 'react';
import TodoTypes from '../todo';
import TodoService from '../TodoService';
import { FaEdit, FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import TodoForm from './TodoForm';
import "../CSS/TodoList.css";
import { fetchtasks } from '../api/tasksService';
import { deleteTask } from '../api/tasksService';
import { updateTask } from '../api/tasksService';

const TodoList = () => {
    const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
    const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
    const [editedTodoText, setEditedTodoText] = useState<string>("");
    const [editedTodoAssignee, setEditedTodoAssignee] = useState<string>("");
    const [editedTodoDescription, setEditedTodoDescription] = useState<string>("");
    
     const [loading, setLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);

    const handleEditStart = (id: number, title: string, assigneeName: string, description: string) => {
        setEditingTodoId(id);
        setEditedTodoText(title);
        setEditedTodoAssignee(assigneeName);
        setEditedTodoDescription(description);
    };

    const handleEditCancel = () => {
        setEditingTodoId(null);
        setEditedTodoText("");
        setEditedTodoAssignee("");
        setEditedTodoDescription("");
    };

    const handleEditSave = async (id: number) => {
        if (editedTodoText.trim() !== "" && editedTodoDescription.trim() !== "" && editedTodoAssignee.trim() !== "") {
            const updatedTask = {
                id,
                title: editedTodoText,
                description: editedTodoDescription,
                assigneeName: editedTodoAssignee, 
                createdBy: "Firdaus",
                modifiedBy: "Selom"
            };

            const response = await updateTask(id, updatedTask);

            setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? response : todo)));
            setEditingTodoId(null);
            setEditedTodoText("");
            setEditedTodoAssignee("");
            setEditedTodoDescription("");
        }
    };

    
    const handleDeleteTodo = async (id?: number) => {
        if(id){
            const response = await deleteTask(id);
        TodoService.deleteTodo(id);
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        }
    };

    
      const loadTasks = async () => {
        try {
          const data = await fetchtasks();
          setTodos(data);
        } catch (error) {
          setError("Failed to load assignees");
        } finally {
          setLoading(false);
        }
      };
      
      useEffect(() => {
        
    
        loadTasks();
      }, []);

    return (
        <div className="todoContainer">
            <TodoForm setTodos={setTodos} />

            {todos.map((todo) => (
                <div className="items" key={todo.id}>
                    {editingTodoId === todo.id ? (
                        <div className="editedText">
                            <input
                                type="text"
                                value={editedTodoText}
                                onChange={(e) => setEditedTodoText(e.target.value)}
                                autoFocus
                            />
                            <input
                                type="text"
                                value={editedTodoAssignee}
                                onChange={(e) => setEditedTodoAssignee(e.target.value)}
                            />
                            <textarea
                                value={editedTodoDescription}
                                onChange={(e) => setEditedTodoDescription(e.target.value)}
                            />

                            <button onClick={() => handleEditSave(todo.id)}>
                                <FaCheck />
                            </button>

                            <button className='cancelBtn' onClick={handleEditCancel}>
                                <GiCancel />
                            </button>
                        </div>
                    ) : (
                        <div className="editBtn">
                            <div>
                                <strong>{todo.assigneeName}</strong>
                                <p>{todo.title}</p>
                                <p>{todo.description}</p>
                            </div>
                            <button onClick={() => {if(todo.id) return handleEditStart(todo.id, todo.assigneeName, todo.title, todo.description)}}>
                                <FaEdit />
                            </button>
                        </div>
                    )}

                    <button onClick={() => handleDeleteTodo(todo.id)}>
                        <RiDeleteBin5Fill />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TodoList;
