import { useState } from 'react';
import TodoTypes from '../todo';
import TodoService from '../TodoService';
import { FaEdit, FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import TodoForm from './TodoForm';
import "../CSS/TodoList.css";

const TodoList = () => {
    const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
    const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
    const [editedTodoText, setEditedTodoText] = useState<string>("");
    const [editedTodoDescription, setEditedTodoDescription] = useState<string>("");

    const handleEditStart = (id: number, text: string, description: string) => {
        setEditingTodoId(id);
        setEditedTodoText(text);
        setEditedTodoDescription(description);
    };

    const handleEditCancel = () => {
        setEditingTodoId(null);
        setEditedTodoText("");
        setEditedTodoDescription("");
    };

    const handleEditSave = (id: number) => {
        if (editedTodoText.trim() !== "" && editedTodoDescription.trim() !== "") {
            const updatedTodo = TodoService.updateTodo({
                id,
                text: editedTodoText,
                description: editedTodoDescription,
                completed: false
            });
            setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)));
            setEditingTodoId(null);
            setEditedTodoText("");
            setEditedTodoDescription("");
        }
    };

    const handleDeleteTodo = (id: number) => {
        TodoService.deleteTodo(id);
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

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
                                <strong>{todo.text}</strong>
                                <p>{todo.description}</p>
                            </div>
                            <button onClick={() => handleEditStart(todo.id, todo.text, todo.description)}>
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
