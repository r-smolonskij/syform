export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";

const fetchCategoriesSuccess = (categories) => ({
    type: FETCH_CATEGORIES_SUCCESS,
    payload: categories
});

// fetch categories
const fetchCategories = (categories) => {
    return (dispatch) => {
        dispatch(fetchCategoriesSuccess(categories));
    };
};

export default fetchCategories;
