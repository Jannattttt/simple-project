import { useEffect, useState } from 'react';
/* import { useNavigate } from 'react-router-dom'; */
import CommentTypes from '../comment';
import { FaEdit, FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";
/* import TodoDetails from './TodoDetails'; */
import "../CSS/TodoList.css";
import { fetchComments, deleteComments, updateComments } from '../api/commentService';
import CommentService from '../CommentService';

const TodoDetailsList = () => {
    const [comments, setComments] = useState<CommentTypes[]>([]);
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [editedComment, setEditedComment] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    /* const navigate = useNavigate(); */

    const handleEditStart = (id: number, description: string) => {
        setEditingCommentId(id);
        setEditedComment(description);
    };

    const handleEditCancel = () => {
        setEditingCommentId(null);
        setEditedComment("");
    };

    const handleEditSave = async (id: number) => {
            if (editedComment.trim() !== "") {
                const updatedComment = {
                    id,
                    description: editedComment,                
                    createdBy: "Firdaus",
                    modifiedBy: "Selom"
                };
    
                const response = await updateComments(id, updatedComment);
    
                setComments((prevComments) => prevComments.map((comment) => (comment.id === id ? response : comment)));
                setEditingCommentId(null);           
                setEditedComment("");
            }
    };

    const handleDeleteTodo = async (id?: number) => {
        if(id){
            const response = await deleteComments(id);
        CommentService.deleteComment(id);
        setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
        }
    };

    const loadComments = async () => {
            try {
              const data = await fetchComments();
              setComments(data);
            } catch (error) {
              setError("Failed to load assignees");
            } finally {
              setLoading(false);
            }
          };
          
          useEffect(() => {
            
        
            loadComments();
          }, []);
    

    return(
        <div className="todoContainer">
            
            {/* <TodoDetails setComments={setComments} /> */}



            {comments.map((comment) => (
                <div className="items" key={comment.id}>
                    {editingCommentId === comment.id ? (
                        <div className="editedText">
                            <textarea
                                value={editedComment}
                                onChange={(e) => setEditedComment(e.target.value)}
                            />

                            <button onClick={() => handleEditSave(comment.id)}>
                                <FaCheck />
                            </button>

                            <button className='cancelBtn' onClick={handleEditCancel}>
                                <GiCancel />
                            </button>
                        </div>
                    ) : (
                        <div className="editBtn">
                            <div>
                                <p>{comment.description}</p>
                            </div>
                            <button onClick={() => {if(comment.id) return handleEditStart(comment.id, comment.description)}}>
                                <FaEdit />
                            </button>
                        </div>
                    )}

                    <button onClick={() => handleDeleteTodo(comment.id)}>
                        <RiDeleteBin5Fill />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TodoDetailsList