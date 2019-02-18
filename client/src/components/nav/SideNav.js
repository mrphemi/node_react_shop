import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Icon from "../icon/Icon";

const Wrapper = styled.div`
   height: 100%;
   width: 60%;
   background-color: #fff;
   position: absolute;
   display: ${props => (props.display ? "block" : "none")};
   top: 88px;
   left: 0;
   z-index: 5;
   padding: 50px;
`;

const Link = ({ className, children, to }) => (
   <NavLink
      to={to}
      exact
      activeStyle={{
         color: "#717fe0"
      }}
      className={className}
   >
      {children}
   </NavLink>
);

const StyledLink = styled(Link)`
   color: black;
   display: block;
   text-decoration: none;
   margin-bottom: 20px;
`;

const Close = styled.span`
   position: absolute;
   top: 15px;
   right: 20px;
   font-size: 15px;
`;

const SideNav = ({ display, close }) => {
   return (
      <Wrapper display={display}>
         <Close onClick={close}>
            <Icon name="close" />
         </Close>
         <StyledLink to="/">HOME</StyledLink>
         <StyledLink to="/products">SHOP</StyledLink>
         <StyledLink to="/login">LOGIN</StyledLink>
      </Wrapper>
   );
};

export default SideNav;
