import api from "./api";
import AssigneeTypes from "../assignee";

// Fetch all assignees
export const fetchAssignee = async (): Promise<AssigneeTypes[]> => {
  const response = await api.get<AssigneeTypes[]>("/assignee");
  return response.data;
};

export const createAssignee = async (newPost: AssigneeTypes): Promise<AssigneeTypes> => {
    const response = await api.post<AssigneeTypes>("/assignee", newPost);
    return response.data;
};

export const deleteAssignee = async (id: string): Promise<AssigneeTypes> => {
  const response = await api.delete<AssigneeTypes>(`/assignee/${id}`);
  return response.data;
};

export const updateAssignee = async (id: number, updatedAssignee: Partial<AssigneeTypes>): Promise<AssigneeTypes> => {
  const response = await api.put<AssigneeTypes>(`/assignee/${id}`, updatedAssignee);
  return response.data;
};




