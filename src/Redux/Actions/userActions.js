export const SET_USERS = "SET_USERS";
export const SET_USER = "SET_USER";
export const SET_LOGGED_USER = "SET_LOGGED_USER";
export const EDIT_PROFILE = "EDIT_PROFILE";
export const USER_TO_UPDATE = "USER_TO_UPDATE";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
export const ADD_USER = "ADD_USER";

export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const setLoggedUser = (user) => ({
  type: SET_LOGGED_USER,
  payload: user,
});

export const editProfile = (user) => ({
  type: EDIT_PROFILE,
  payload: user,
});

export const setUserToUpdate = (user) => ({
  type: USER_TO_UPDATE,
  payload: user,
});

export const updateUserProfile = (user) => ({
  type: UPDATE_USER,
  payload: user,
});

export const deleteUser = (userToDelete) => ({
  type: DELETE_USER,
  payload: userToDelete,
});
