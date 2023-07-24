// src/utils/reducers.js

// ... (existing imports)
import { MARK_TASK_COMPLETE } from './actions'; // Add the new import

const initialState = {
  // ... (existing state properties)
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    // ... (existing cases)
    case MARK_TASK_COMPLETE:
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task._id === action.payload) {
            return {
              ...task,
              completed: true
            };
          }
          return task;
        })
      };
    default:
      return state;
  }
};

export default reducers;
