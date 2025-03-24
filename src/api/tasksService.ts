import api from "./api";
import TodoTypes from "../todo";

// Fetch all assignees
export const fetchtasks = async (): Promise<TodoTypes[]> => {
  const response = await api.get<TodoTypes[]>("/tasks");
  return response.data;
};

export const createTasks = async (newPost: TodoTypes): Promise<TodoTypes> => {
    const response = await api.post<TodoTypes>("/tasks", newPost);
    return response.data;
};

export const deleteTask = async (id: string): Promise<TodoTypes> => {
  const response = await api.delete<TodoTypes>(`/tasks/${id}`);
  return response.data;
};

export const updateTask = async (id: number, updatedTask: Partial<TodoTypes>): Promise<TodoTypes> => {
  const response = await api.put<TodoTypes>(`/tasks/${id}`, updatedTask);
  return response.data;
};




