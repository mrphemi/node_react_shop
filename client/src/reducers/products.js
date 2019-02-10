import { GET_PRODUCTS, GET_PRODUCT } from "../actions/types";

const INITIAL_STATE = {
   productsList: [],
   product: {}
};

function products(state = INITIAL_STATE, action) {
   switch (action.type) {
      case GET_PRODUCTS:
         return {
            ...state,
            productsList: action.products
         };
      case GET_PRODUCT:
         return {
            ...state,
            product: action.product
         };
      default:
         return state;
   }
}

export default products;
