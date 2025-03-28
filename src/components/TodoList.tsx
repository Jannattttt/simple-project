import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoTypes from '../todo';
import TodoService from '../TodoService';
import { FaEdit, FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import TodoForm from './TodoForm';
import "../CSS/TodoList.css";
import { fetchtasks, deleteTask, updateTask } from '../api/tasksService';

const TodoList = () => {
    const [todos, setTodos] = useState<TodoTypes[]>([]);
    const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
    const [editedTodoText, setEditedTodoText] = useState<string>("");
    const [editedTodoAssignee, setEditedTodoAssignee] = useState<string>("");
    const [editedTodoDescription, setEditedTodoDescription] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleEditStart = (id: number, assigneeName: string,  title: string, description: string) => {
        setEditingTodoId(id);
        setEditedTodoAssignee(assigneeName);
        setEditedTodoText(title);
        setEditedTodoDescription(description);
    };

    const handleEditCancel = () => {
        setEditingTodoId(null);
        setEditedTodoAssignee("");
        setEditedTodoText("");
        setEditedTodoDescription("");
    };

    const handleEditSave = async (id: number) => {
        if (editedTodoAssignee.trim() !== "" && editedTodoText.trim() !== "" && editedTodoDescription.trim() !== "") {
            const updatedTask = {
                id,
                assigneeName: editedTodoAssignee, 
                title: editedTodoText,
                description: editedTodoDescription,                
                createdBy: "Firdaus",
                modifiedBy: "Selom"
            };

            const response = await updateTask(id, updatedTask);

            setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? response : todo)));
            setEditingTodoId(null);
            setEditedTodoAssignee("");
            setEditedTodoText("");            
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
                                value={editedTodoAssignee}
                                onChange={(e) => setEditedTodoAssignee(e.target.value)}
                                autoFocus
                            />
                            <input
                                type="text"
                                value={editedTodoText}
                                onChange={(e) => setEditedTodoText(e.target.value)}
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
                            <div onClick={() => navigate(`/todo/${todo.id}`)}>
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
