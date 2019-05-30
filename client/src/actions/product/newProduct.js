import axios from "axios";
import { getProduct } from "./getProducts";
import { showErr, showMsg } from "../message";

const createProduct = (history, details) => (dispatch, getState) => {
   const data = new FormData();
   data.append("productImg", details.img);
   data.append("userId", details.id);
   data.append("name", details.name);
   data.append("category", details.category);
   data.append("desc", details.desc);
   data.append("price", details.price);

   axios
      .post("/products", data, {
         headers: {
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`
         }
      })
      .then(res => {
         let { product, message, errorMsg } = res.data;
         if (errorMsg) {
            dispatch(showErr(errorMsg));
         } else {
            dispatch(getProduct(product));
            const productId = getState().products.product._id;
            history.push(`/products/${productId}`);
            dispatch(showMsg(message));
         }
      })
      .catch(err => console.log(err));
};

export default createProduct;
