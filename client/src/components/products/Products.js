import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { fetchProducts } from "../../actions/product/getProducts";

const Wrapper = styled.div`
   padding: 30px 20px;
   display: grid;
`;

const Name = styled.p`
   font-size: 14px;
   padding: 0 20px;
`;

class Products extends Component {
   state = {};

   componentDidMount() {
      this.props.fetchProducts();
   }

   render() {
      const products = this.props.products;
      return (
         <Wrapper>
            {products.map(product => (
               <Name key={product.id}>{product.name}</Name>
            ))}
         </Wrapper>
      );
   }
}

const mapStateToProps = state => {
   return {
      products: state.products.productsList
   };
};

const mapDispatchToProps = dispatch => {
   return {
      fetchProducts: () => dispatch(fetchProducts())
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Products);
