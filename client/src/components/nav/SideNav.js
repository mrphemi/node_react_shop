import React from "react";
import styled from "styled-components";

import Icon from "../icon/Icon";
import withAuthentication from "../session/withAuthentication";
import LinksAuth, { LinksNonAuth } from "./NavLinks";

const Wrapper = styled.div`
   height: 100%;
   width: 60%;
   background-color: #fff;
   position: absolute;
   display: ${props => (props.display ? "block" : "none")};
   top: 87px;
   left: 0;
   z-index: 5;
   padding: 50px;
`;

const Close = styled.span`
   position: absolute;
   top: 15px;
   right: 20px;
   font-size: 15px;
   cursor: pointer;
`;

const SideNav = ({ display, close, authenticated }) => {
   return (
      <Wrapper display={display}>
         <Close>
            <Icon name="close" onClick={close} />
         </Close>
         {authenticated ? (
            <LinksAuth close={close} />
         ) : (
            <LinksNonAuth close={close} />
         )}
      </Wrapper>
   );
};

export default withAuthentication()(SideNav);
