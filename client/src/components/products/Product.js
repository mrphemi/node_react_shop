import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { fetchProduct } from "../../actions/product/getProducts";

class Product extends Component {
   componentDidMount() {
      const id = this.props.match.params.productId;
      this.props.fetchProduct(id);
   }

   render() {
      const product = this.props.product;
      return (
         <div>
            <p>{product.name}</p>
         </div>
      );
   }
}

const mapStateToProps = state => {
   return {
      product: state.products.product
   };
};

const mapDispatchToProps = dispatch => {
   return {
      fetchProduct: productId => dispatch(fetchProduct(productId))
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Product);
