import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

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

const Logout = styled.span`
   display: block;
   margin-bottom: 20px;
   color: black;
`;

export const LinksAuth = () => (
   <>
      <StyledLink to="/">HOME</StyledLink>
      <StyledLink to="/products">SHOP</StyledLink>
      <Logout>Logout</Logout>
   </>
);

export const LinksNonAuth = () => (
   <>
      <StyledLink to="/">HOME</StyledLink>
      <StyledLink to="/products">SHOP</StyledLink>
      <StyledLink to="/login">LOGIN</StyledLink>
   </>
);
