import { SHOW_MSG, SHOW_ERR_MSG } from "../actions/types";

const INITIAL_STATE = {
   errMsg: "",
   msg: ""
};

function showMessage(state = INITIAL_STATE, action) {
   switch (action.type) {
      case SHOW_ERR_MSG:
         return {
            ...state,
            msg: "",
            errMsg: action.err
         };
      case SHOW_MSG:
         return {
            ...state,
            msg: action.msg,
            errMsg: ""
         };
      default:
         return state;
   }
}

export default showMessage;
