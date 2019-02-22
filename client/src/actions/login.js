import axios from "axios";
import jwt_decode from "jwt-decode";

import { SET_CURRENT_USER, LOGIN_ERROR } from "./types";
import { showErr, showMsg } from "./message";
import setAuthToken from "../utils/setAuthToken";

export const setCurrentUser = user => {
   return {
      type: SET_CURRENT_USER,
      user
   };
};

const loginErr = () => {
   return {
      type: LOGIN_ERROR
   };
};

export const login = credentials => {
   return dispatch => {
      axios
         .post("/login", credentials)
         .then(res => {
            let { token, errorMsg, message } = res.data;

            if (errorMsg) {
               // display error message
               dispatch(showErr(errorMsg));
               dispatch(loginErr());
            } else {
               // Store token in local storage
               localStorage.setItem("token", token);
               // Set Auth Token as request axios authorization header
               setAuthToken(token);
               // Decode token to get user data
               let user = jwt_decode(token);
               dispatch(showMsg(message));
               // Set current user
               dispatch(setCurrentUser(user));
            }
         })
         .catch(err => console.log(err));
   };
};

export const logout = () => dispatch => {
   // Remove token from local storage
   localStorage.removeItem("token");
   // Remove axios Auth header
   setAuthToken(false);
   // Set current user to empty object
   dispatch(setCurrentUser({}));
};
