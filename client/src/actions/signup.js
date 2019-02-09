import axios from "axios";
import { showErr, showMsg } from "./message";

// Register user
export const registerUser = (userData, history) => dispatch => {
   axios
      .post("/signup", userData)
      .then(res => {
         let { errorMsg, message } = res.data;
         if (errorMsg) {
            // display error message
            dispatch(showErr(errorMsg));
         } else {
            // registration sucessful
            dispatch(showMsg(message));
            history.push("/login");
         }
      })
      .catch(err => console.log(err));
};
