export const SET_TASKS = "SET_TASKS";
export const SET_TASK = "SET_TASK";
export const SET_TASK_TO_UPDATE = "SET_TASK_TO_UPDATE";
export const UPDATE_TASK = "UPDATE_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const ADD_COMMENT = "ADD_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const SET_COMMENT_ON_EDIT = "SET_COMMENT_ON_EDIT";
export const SET_COMMENT_TO_UPDATE = "SET_COMMENT_TO_UPDATE";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const RESET_FILTERS = "RESET_FILTERS";
export const SET_FILTERS = "SET_FILTERS";

export const setTasks = (tasks) => ({
  type: SET_TASKS,
  payload: tasks,
});

export const setTask = (task) => ({
  type: SET_TASK,
  payload: task,
});

export const setTaskToUpdate = (task) => ({
  type: SET_TASK_TO_UPDATE,
  payload: task,
});

export const updateTask = (task) => ({
  type: UPDATE_TASK,
  payload: task,
});

export const removeTask = (task) => ({
  type: DELETE_TASK,
  payload: task,
});

export const addComment = (comment) => ({
  type: ADD_COMMENT,
  payload: comment,
});

export const removeComment = (commentId) => ({
  type: DELETE_COMMENT,
  payload: commentId,
});

export const setCommentOnEdit = (isOnEditComment) => ({
  type: SET_COMMENT_ON_EDIT,
  payload: isOnEditComment,
});

export const setCommentToUpdate = (comment) => ({
  type: SET_COMMENT_TO_UPDATE,
  payload: comment,
});

export const updateComment = (comment) => ({
  type: UPDATE_COMMENT,
  payload: comment,
});

export const resetFilters = () => ({
  type: RESET_FILTERS,
});

export const setFilters = (filters) => ({
  type: SET_FILTERS,
  payload: filters,
});
