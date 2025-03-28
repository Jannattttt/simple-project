import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchtasks } from '../api/tasksService';
import "../CSS/TodoDetails.css";
import { createComments } from '../api/commentService';
import CommentTypes from '../comment';
import TodoDetailsList from './TodoDetailsList';

interface PropTypes {
    setComments: Dispatch<SetStateAction<CommentTypes[]>>;
}

const TodoDetails: React.FC<PropTypes> = ({ setComments }) => {   // ✅ Accept setComments as prop
    const [newComment, setNewComment] = useState<string>("");
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [todo, setTodo] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const data = await fetchtasks();
                const foundTask = data.find((task: any) => task.id === Number(id));
                setTodo(foundTask);
            } catch (error) {
                setError("Task not found");
            } finally {
                setLoading(false);
            }
        };

        fetchTask();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const handleAddComment = async () => {
        if (newComment.trim() !== "") {
            try {
                const response = await createComments({
                    description: newComment,
                    createdBy: "user"
                } as CommentTypes);

                console.log("New comment response:", response);

                setComments((prevComments) => [...prevComments, response]);  // ✅ No need for type check

                setNewComment("");
            } catch (error) {
                console.error("Failed to create comment:", error);
            }
        }
    };

    return (
        <>
            <div className="todoDetailsContainer">
                <button onClick={() => navigate(-1)}>Go Back</button>
                <h2>{todo?.title}</h2>
                <p><strong>Assigned to:</strong> {todo?.assigneeName}</p>
                <p><strong>Description:</strong> {todo?.description}</p>
            </div>
            <div /* className="todoDetailsContainer" */>
                <div className='commentText'>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment"
                        rows={2} cols={55}
                    />
                    <button onClick={handleAddComment}>Add</button>
                </div>
            </div>
            <TodoDetailsList />
        </>
    );
};

export default TodoDetails;
