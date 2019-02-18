import React, { Component } from "react";

import {} from "../../actions/product/newProduct";

class CreateProduct extends Component {
   state = {
      imageFile: null,
      name: "",
      price: null,
      desc: "",
      category: ""
   };

   onChange = e => {
      this.setState({
         [e.target.name]: e.target.value
      });
   };

   onChangeFile(e) {
      this.setState({ imageFile: e.target.files[0] });
   }

   saveProduct = e => {
      e.preventDefault();
      console.log("Product created");
   };

   render() {
      return (
         <form onSubmit={this.saveProduct}>
            <input
               type="text"
               name="name"
               id="name"
               placeholder="Enter product name"
               onChange={this.onChange}
            />
            <input
               type="text"
               name="category"
               id="category"
               placeholder="Enter category"
               onChange={this.onChange}
            />
            <input
               type="text"
               name="price"
               id="price"
               placeholder="Enter price"
               onChange={this.onChange}
            />
            <textarea placeholder="Enter quick decription" />
            <input
               type="file"
               name="productImg"
               id="productImg"
               onChange={this.onChangeFile}
            />
         </form>
      );
   }
}

export default CreateProduct;
