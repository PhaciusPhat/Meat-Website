import { combineReducers } from "redux";
import signInReducer from "./signInReducer";
import signUpReducer from "./signUpReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import invoiceReducer from './invoiceReducer';
import accountReducer from './accountReducer';

export const rootReducer = combineReducers({
  signInReducer,
  signUpReducer,
  productReducer,
  cartReducer,
  invoiceReducer,
  accountReducer,
});
