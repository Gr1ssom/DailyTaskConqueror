// Action types for tasks
export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const UPDATE_TASKS_STATUS = 'UPDATE_TASKS_STATUS';
export const REMOVE_FROM_TASKS = 'REMOVE_FROM_TASKS';
export const MARK_TASK_COMPLETE = 'MARK_TASK_COMPLETE';
export const UPDATE_TASKS_QUANTITY = 'UPDATE_TASKS_QUANTITY'; // Add the missing action type
export const REMOVE_TASK = 'REMOVE_TASK'; // Add the missing action type

// Action types for user
export const ADD_USER = 'ADD_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';

// Action creator function to add a new task
export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

// Action creator function to update a task
export const updateTask = (taskId, updatedTask) => ({
  type: UPDATE_TASK,
  payload: { taskId, updatedTask },
});

// Action creator function to delete a task
export const deleteTask = (taskId) => ({
  type: DELETE_TASK,
  payload: taskId,
});

// Action creator function to add a new user
export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

// Action creator function to log in a user
export const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: user,
});

// Action creator function to log out a user
export const logoutUser = () => ({
  type: LOGOUT_USER,
});

// Action creator function to mark a task as complete
export const markTaskComplete = (taskId) => ({
  type: MARK_TASK_COMPLETE,
  payload: taskId,
});

// Action creator function to remove a task
export const removeTask = (taskId) => ({
  type: REMOVE_TASK,
  payload: taskId,
});
