import axios from "axios";
import { GET_PRODUCTS, GET_PRODUCT } from "./types";

const getProducts = products => {
   return {
      type: GET_PRODUCTS,
      products
   };
};

const getProduct = product => {
   return {
      type: GET_PRODUCT,
      product
   };
};

// Fetch product list
export const fetchProducts = () => dispatch => {
   axios.get("/products").then(res => {
      let { products } = res.data;
      dispatch(getProducts(products));
   });
};

// Fetch single product details
export const fetchProduct = id => dispatch => {
   axios.get(`/products/${id}`).then(res => {
      let { product } = res.data;
      dispatch(getProduct(product));
   });
};
