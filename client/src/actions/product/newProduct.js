import axios from "axios";

export const uploadImage = image => {
   const config = {
      headers: {
         "content-type": "multipart/form-data"
      }
   };
   return axios.post("/products/image-upload", image, config);
};

export const createProduct = (details, history) => {
   axios
      .post("/products", details)
      .then(res => {
         let { product } = res.data;
         history.push(`/products/${product.id}`);
      })
      .catch();
};
