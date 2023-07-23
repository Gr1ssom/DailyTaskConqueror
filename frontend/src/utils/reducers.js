import {
    UPDATE_PROFILE,
    ADD_TO_TASKS,
    UPDATE_TASKS_QUANTITY,
    REMOVE_FROM_TASKS,
    //ADD_MULTIPLE_TO_CART,
    //UPDATE_CATEGORIES,
    //UPDATE_CURRENT_CATEGORY,
    CLEAR_TASKS,
    TOGGLE_TASKS
} 
  
from "./actions";
  
  const initialState = {
    products: [],
    categories: [],
    currentCategory: '',
    cart: [],
    cartOpen: false
};
  
export const reducers = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_PROFILE:
        return {
          ...state,
          products: [...action.products],
        };
  
      case ADD_TO_TASKS:
        return {
          ...state,
          cartOpen: true,
          cart: [...state.cart, action.product],
        };
  
      //case ADD_MULTIPLE_TO_CART:
        return {
          ...state,
          cart: [...state.cart, ...action.products],
        };
  
      case UPDATE_TASKS_QUANTITY:
        return {
          ...state,
          cartOpen: true,
          cart: state.cart.map(product => {
            if (action._id === product._id) {
              product.purchaseQuantity = action.purchaseQuantity
            }
            return product
          })
        };
  
      case REMOVE_FROM_TASKS:
        let newState = state.cart.filter(product => {
          return product._id !== action._id;
        });
  
        return {
          ...state,
          cartOpen: newState.length > 0,
          cart: newState
        };
  
      case CLEAR_TASKS:
        return {
          ...state,
          cartOpen: false,
          cart: []
        };
  
      case TOGGLE_TASKS:
        return {
          ...state,
          cartOpen: !state.cartOpen
        };
  
      //case UPDATE_CATEGORIES:
        return {
          ...state,
          categories: [...action.categories],
        };
  
      //case UPDATE_CURRENT_CATEGORY:
        return {
          ...state,
          currentCategory: action.currentCategory
      //  }
  
      //default:
      //  return state;
    //}
}; 
  
export default reducers;