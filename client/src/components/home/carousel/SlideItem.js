import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
   padding: 30px;
   height: 100%;
   /* background-image: url("${props => props.background}"); */
   background: ${props => props.background};
`;

const Heading = styled.h1`
   color: #9d9c99;
`;

const Text = styled.p`
   font-size: 18px;
   color: #9d9c99;
`;

const Button = ({ className, children, to }) => (
   <Link to={to} className={className}>
      {children}
   </Link>
);

const Btn = styled(Button)`
   border: none;
   border-radius: 20px;
   padding: 15px 40px;
   color: #fff;
   background-color: #717fe0;
   text-decoration: none;
   display: inline-block;
   margin-top: 10px;
`;

const SlideItem = ({ background }) => {
   return (
      <Wrapper background={background}>
         <Heading>Lorem, ipsum dolor. </Heading>
         <Text>Lorem ipsum dolor sit amet consectetur.</Text>
         <Btn to="/products">SHOP NOW</Btn>
      </Wrapper>
   );
};

export default SlideItem;
