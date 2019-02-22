import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { logout } from "../../actions/login";
import NavLink from "./NavLink";

const Logout = styled.span`
   display: block;
   margin-bottom: 20px;
   color: black;
`;

const LinksAuth = ({ logout, close }) => (
   <>
      <NavLink to="/" close={close}>
         HOME
      </NavLink>
      <NavLink to="/products" close={close}>
         SHOP
      </NavLink>
      <NavLink to="/products/create" close={close}>
         CREATE
      </NavLink>
      <Logout onClick={logout}>LOGOUT</Logout>
   </>
);

export const LinksNonAuth = ({ close }) => (
   <>
      <NavLink to="/" close={close}>
         HOME
      </NavLink>
      <NavLink to="/products" close={close}>
         SHOP
      </NavLink>
      <NavLink to="/login" close={close}>
         LOGIN
      </NavLink>
   </>
);

const mapDispatchToProps = dispatch => {
   return {
      logout: () => dispatch(logout())
   };
};

export default connect(
   null,
   mapDispatchToProps
)(LinksAuth);
