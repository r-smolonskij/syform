export const FETCH_SETTINGS_SUCCESS = "FETCH_SETTINGS_SUCCESS";

const fetchSettingsSuccess = (settings) => ({
    type: FETCH_SETTINGS_SUCCESS,
    payload: settings
});

// fetch products
const fetchSettings = (products) => {
    return (dispatch) => {
        dispatch(fetchSettingsSuccess(products));
    };
};

export default fetchSettings;
