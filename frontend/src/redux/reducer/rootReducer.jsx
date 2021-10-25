import { combineReducers } from "redux";
import signInReducer from "./signInReducer";
import signUpReducer from "./signUpReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";

export const rootReducer = combineReducers({
  signInReducer,
  signUpReducer,
  productReducer,
  cartReducer,
});
