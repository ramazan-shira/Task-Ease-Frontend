import {
  ADD_COMMENT,
  DELETE_COMMENT,
  DELETE_TASK,
  RESET_FILTERS,
  SET_COMMENT_ON_EDIT,
  SET_COMMENT_TO_UPDATE,
  SET_FILTERS,
  SET_TASK,
  SET_TASKS,
  SET_TASK_TO_UPDATE,
  UPDATE_COMMENT,
  UPDATE_TASK,
} from "../Actions/taskActions";

const initialState = {
  tasks: [],
  filteredTasks: [],
  taskOnEdit: {},
  isOnEditComment: false,
  commentOnEdit: {},

  filters: {
    dateFilter: "",
    assigneeFilter: "",
    priorityFilter: "",
    teamFilter: "",
  },
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };

    case SET_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case SET_TASK_TO_UPDATE:
      return {
        ...state,
        taskOnEdit: action.payload,
      };

    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id
            ? { ...task, ...action.payload }
            : task
        ),
      };

    case DELETE_TASK:
      const newTasks = state.tasks.filter(
        (task) => task._id !== state.taskOnEdit._id
      );
      return {
        ...state,
        taskOnEdit: {},
        tasks: newTasks,
      };

    case ADD_COMMENT:
      return {
        ...state,
        taskOnEdit: {
          ...state.taskOnEdit,
          comments: [...state.taskOnEdit.comments, action.payload],
        },
        tasks: state.tasks.map((task) =>
          task._id === state.taskOnEdit._id
            ? { ...task, comments: [...task.comments, action.payload] }
            : task
        ),
      };

    case DELETE_COMMENT:
      return {
        ...state,
        taskOnEdit: {
          ...state.taskOnEdit,
          comments: state.taskOnEdit.comments.filter(
            (comment) => comment._id !== action.payload
          ),
        },
        tasks: state.tasks.map((task) =>
          task._id === state.taskOnEdit._id
            ? {
                ...task,
                comments: task.comments.filter(
                  (comment) => comment._id !== action.payload
                ),
              }
            : task
        ),
      };

    case SET_COMMENT_ON_EDIT:
      return {
        ...state,
        isOnEditComment: action.payload,
      };

    case SET_COMMENT_TO_UPDATE:
      return {
        ...state,
        commentOnEdit: action.payload,
      };

    case UPDATE_COMMENT:
      return {
        ...state,
        taskOnEdit: {
          ...state.taskOnEdit,
          comments: state.taskOnEdit.comments.map((comment) => {
            if (comment._id === action.payload.commentId) {
              return {
                ...comment,
                text: action.payload.text,
                date: action.payload.date,
              };
            }
            return comment;
          }),
        },
        tasks: state.tasks.map((task) =>
          task._id === state.taskOnEdit._id
            ? {
                ...task,
                comments: task.comments.map((comment) => {
                  if (comment._id === action.payload.commentId) {
                    return {
                      ...comment,
                      text: action.payload.text,
                      date: action.payload.date,
                    };
                  }
                  return comment;
                }),
              }
            : task
        ),
      };
    case SET_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };

    case RESET_FILTERS:
      return {
        ...state,
        filters: initialState.filters,
      };

    default: {
      return state;
    }
  }
};

export default taskReducer;
