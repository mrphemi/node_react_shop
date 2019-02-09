import { combineReducers } from "redux";
import authReducer from "./authReducer";
import showMessage from "./showMessage";

export default combineReducers({
   auth: authReducer,
   message: showMessage
});
