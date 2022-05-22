import { FETCH_CATEGORIES_SUCCESS } from "../actions/categoryActions";

const initState = [];

const categoryReducer = (state = initState, action) => {
    if (action.type === FETCH_CATEGORIES_SUCCESS) {
        state = action.payload.slice(0);
        return state;
    }
    return state;
};

export default categoryReducer;
