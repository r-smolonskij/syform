import { FETCH_SETTINGS_SUCCESS } from "../actions/settingsActions";

const initState = [];

const settingsReducer = (state = initState, action) => {
    if (action.type === FETCH_SETTINGS_SUCCESS) {
        if (action.payload) {
            state = action.payload;
        }
        return state;
    }

    return state;
};

export default settingsReducer;
