import {
  UPDATE_PROFILE,
  ADD_TO_TASKS,
  REMOVE_FROM_TASKS,
  CLEAR_TASKS,
  TOGGLE_TASKS,
  UPDATE_TASKS_QUANTITY,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  MARK_TASK_COMPLETE   // 1. Import the new action type
} from './actions';

const initialState = {
  profiles: [],
  categories: [],
  currentCategory: '',
  tasks: []
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        profiles: [...action.profiles],
      };

    case ADD_TO_TASKS:
      return {
        ...state,
        tasks: [...state.tasks, action.profile],
      };

    case UPDATE_TASKS_QUANTITY:
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (action._id === task._id) {
            task.purchaseQuantity = action.purchaseQuantity;
          }
          return task;
        })
      };

    case REMOVE_FROM_TASKS:
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action._id)
      };

    case TOGGLE_TASKS:
      return state;   // If there's no specific behavior you want for this action, you can remove it.

    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory
      };

    case CLEAR_TASKS:
      return {
         ...state,
         tasks: []
       };
        
    case MARK_TASK_COMPLETE:  // 2. Handle the new action type
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
