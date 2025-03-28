import api from "./api";
import CommentTypes from "../comment";

// Fetch all comments
export const fetchComments = async (): Promise<CommentTypes[]> => {
  const response = await api.get<CommentTypes[]>("/comments");
  return response.data;
};

export const createComments = async (newPost: CommentTypes): Promise<CommentTypes> => {
    const response = await api.post<CommentTypes>("/comments", newPost);
    return response.data;
};

export const deleteComments = async (id: string): Promise<CommentTypes> => {
  const response = await api.delete<CommentTypes>(`/comments/${id}`);
  return response.data;
};

export const updateComments = async (id: number, updateComments: Partial<CommentTypes>): Promise<CommentTypes> => {
  const response = await api.put<CommentTypes>(`/comments/${id}`, updateComments);
  return response.data;
};




