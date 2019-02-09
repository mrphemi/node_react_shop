import { SHOW_ERR_MSG, SHOW_MSG } from "./types";

export const showMsg = msg => {
   return {
      type: SHOW_MSG,
      msg
   };
};

export const showErr = err => {
   return {
      type: SHOW_ERR_MSG,
      err
   };
};
