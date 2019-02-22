import axios from "axios";
import { setCurrentUser } from "./login";

// Verify user through auth token
const verifyUser = history => dispatch => {
   axios
      .post("/auth")
      .then(res => {
         let { errorMsg, user } = res.data;
         if (errorMsg) {
            history.push("/login");
         } else {
            dispatch(setCurrentUser(user));
         }
      })
      .catch(err => console.log(err));
};

export default verifyUser;
