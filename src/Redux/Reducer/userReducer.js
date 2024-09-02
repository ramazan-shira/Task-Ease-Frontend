import {
  DELETE_USER,
  EDIT_PROFILE,
  SET_LOGGED_USER,
  SET_USER,
  SET_USERS,
  UPDATE_USER,
  USER_TO_UPDATE,
} from "../Actions/userActions";

const initialState = {
  users: [],
  loggedUser: {},
  userToUpdate: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case SET_LOGGED_USER:
      return {
        ...state,
        loggedUser: action.payload,
      };

    case EDIT_PROFILE:
      return {
        ...state,
        loggedUser: action.payload,
        users: state.users.map((user) => {
          if (user._id === state.loggedUser.id) {
            user.image = action.payload.image;
            user.name = action.payload.name;
            user.email = action.payload.email;
            user.phone = action.payload.phone;
            user.password = action.payload.password;
          }
          return user;
        }),
      };

    case USER_TO_UPDATE:
      return {
        ...state,
        userToUpdate: action.payload.user,
      };

    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user._id === action.payload.id) {
            return {
              ...user,
              image: action.payload.image,
              name: action.payload.name,
              email: action.payload.email,
              phone: action.payload.phone,
              password: action.payload.password,
              role: action.payload.role,
            };
          }
          return user;
        }),
      };

    case DELETE_USER:
      const newUsers = state.users.filter(
        (user) => user._id !== action.payload.userToDelete
      );
      return {
        ...state,
        users: newUsers,
      };
    default: {
      return state;
    }
  }
};

export default userReducer;
