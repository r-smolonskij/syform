import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import compareReducer from "./compareReducer";
import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";
import settingsReducer from "./settingsReducer";

const rootReducer = combineReducers({
  productData: productReducer,
  cartData: cartReducer,
  wishlistData: wishlistReducer,
  compareData: compareReducer,
  categoryData: categoryReducer,
  settingsData: settingsReducer
});

export default rootReducer;
