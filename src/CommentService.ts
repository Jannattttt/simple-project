import CommentTypes from "./comment";

const LOCAL_STORAGE_KEY = "comments";

const CommentService = {
    // Get comments
    getComments: (): CommentTypes[] => {
        const commentStr = localStorage.getItem(LOCAL_STORAGE_KEY);
        return commentStr ? JSON.parse(commentStr) : [];
    },

    // Add Todos
    addComments: ( description: string,): CommentTypes => {
        const comments = CommentService.getComments();
        const newComment: CommentTypes = { id: comments.length + 1, description};
        const updatedComments = [...comments, newComment];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedComments));
        return newComment;
    },

    // Update Todo
    updateComment: (comment: CommentTypes): CommentTypes => {
        const comments = CommentService.getComments();
        const updatedComments = comments.map((t) => (t.id === comment.id ? comment : t));
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedComments));
        return comment;
    },

    // Delete Todo
    deleteComment: (id: number): void => {
        const comments = CommentService.getComments();
        const updatedComments = comments.filter((comment) => comment.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedComments));
    }
};

export default CommentService;
