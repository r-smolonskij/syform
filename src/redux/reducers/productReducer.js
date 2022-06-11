import { FETCH_PRODUCTS_SUCCESS } from "../actions/productActions";

const initState = [];

const productReducer = (state = initState, action) => {
  if (action.type === FETCH_PRODUCTS_SUCCESS) {
    if (action.payload) {
      state = action.payload.slice(0);
    }
    return state;
  }

  return state;
};

export default productReducer;
