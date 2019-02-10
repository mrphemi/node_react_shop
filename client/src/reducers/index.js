import { combineReducers } from "redux";
import authReducer from "./authReducer";
import showMessage from "./showMessage";
import products from "./products";

export default combineReducers({
   auth: authReducer,
   message: showMessage,
   products
});
