import AssigneeTypes from "./assignee";

const LOCAL_STORAGE_KEY = "assignees";

const AssigneeService = {
    // Get assignees
    getAssignees: (): AssigneeTypes[] => {
        const assigneeStr = localStorage.getItem(LOCAL_STORAGE_KEY);
        return assigneeStr ? JSON.parse(assigneeStr) : [];
    },

    // Add assignees
    addAssignees: (firstName: string, lastName: string, createdBy: string): AssigneeTypes => {
        const assignees = AssigneeService.getAssignees();
        const newAssignee: AssigneeTypes = { id: assignees.length + 1, firstName, lastName, createdBy };
        const updateAssignees = [...assignees, newAssignee];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateAssignees));
        return newAssignee;
    },

    // Update Todo
    updateAssignee: (assignee: AssigneeTypes): AssigneeTypes => {
        const assignees = AssigneeService.getAssignees();
        const updateAssignees = assignees.map((t) => (t.id === assignee.id ? assignee : t));
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateAssignees));
        return assignee;
    },

    // Delete Todo
    deleteAssignee: (id: number): void => {
        const assignees = AssigneeService.getAssignees();
        const updateAssignees = assignees.filter((assignee) => assignee.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateAssignees));
    }
};

export default AssigneeService;
