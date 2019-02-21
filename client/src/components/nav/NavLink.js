import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const link = ({ className, children, to }) => (
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

const StyledLink = styled(link)`
   color: black;
   display: block;
   text-decoration: none;
   margin-bottom: 20px;
`;

const Link = ({ close, to, children }) => (
   <span onClick={close}>
      <StyledLink to={to}>{children}</StyledLink>
   </span>
);

export default Link;
