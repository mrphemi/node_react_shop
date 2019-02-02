import axios from "axios";
import jwt_decode from "jwt-decode";
import { LOGIN_ERROR, SET_CURRENT_USER } from "./types";

const setCurrentUser = user => {
   return {
      type: SET_CURRENT_USER,
      user
   };
};

const loginError = error => {
   return {
      type: LOGIN_ERROR,
      error
   };
};

export const login = credentials => {
   return dispatch => {
      axios
         .post("http://localhost:5000/login", credentials)
         .then(res => {
            let { token, errorMsg } = res.data;

            if (errorMsg) {
               dispatch(loginError(errorMsg));
            }
            // Store token in local storage
            localStorage.setItem("token", token);
            // Decode token to get user data
            let user = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(user));
         })
         .catch(err => console.log(err));
   };
};

export const logout = () => dispatch => {
   // Remove token from local storage
   localStorage.removeItem("token");
   // Set current user to empty object
   dispatch(setCurrentUser({}));
};
