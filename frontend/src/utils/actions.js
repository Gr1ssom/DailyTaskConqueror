export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const ADD_TO_TASKS = "ADD_TO_TASKS";
export const REMOVE_FROM_TASKS = "REMOVE_FROM_TASKS";
export const CLEAR_TASKS = "CLEAR_TASKS";
export const TOGGLE_TASKS = "TOGGLE_TASKS";
export const UPDATE_TASK_QUANTITY = "UPDATE_TASK_QUANTITY";
export const UPDATE_TASKS_QUANTITY = "UPDATE_TASKS_QUANTITY";
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
export const UPDATE_CURRENT_CATEGORY = "UPDATE_CURRENT_CATEGORY";
export const UPDATE_TASKS = "UPDATE_TASKS";
export const UPDATE_TASKS_STATUS = "UPDATE_TASKS_STATUS";
export const MARK_TASK_COMPLETE = "MARK_TASK_COMPLETE";
export const markTaskAsComplete = (taskId) => ({
  type: MARK_TASK_COMPLETE,
  payload: taskId
});