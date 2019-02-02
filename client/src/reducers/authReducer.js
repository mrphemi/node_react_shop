import { LOGIN_ERROR, SET_CURRENT_USER } from "../actions/types";

const INITIAL_STATE = {
   isAuthenticated: false,
   user: {}
};

function authReducer(state = INITIAL_STATE, action) {
   switch (action.type) {
      case SET_CURRENT_USER:
         return {
            ...state,
            isAuthenticated: Boolean(Object.keys(action.user).length),
            user: action.user
         };
      case LOGIN_ERROR:
         return {
            ...state,
            isAuthenticated: false,
            user: {}
         };
      default:
         return state;
   }
}

export default authReducer;
