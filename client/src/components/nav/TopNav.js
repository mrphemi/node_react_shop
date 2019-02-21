import React, { Component } from "react";
import styled from "styled-components";

import Icon from "../icon/Icon";
import SideNav from "./SideNav";

const Nav = styled.div`
   background: #fff;
   padding: 20px;
   display: flex;
   justify-content: space-between;
`;

const Logo = styled.span`
   display: block;
   font-size: 30px;
   font-family: "Shadows Into Light", cursive;
   font-weight: bold;
`;

const Right = styled.div`
   align-self: center;
   span {
      margin-right: 10px;
      &:last-of-type {
         margin-right: 0;
      }
      ion-icon {
         font-size: 20px;
         cursor: pointer;
      }
   }
`;

class TopNav extends Component {
   state = {
      showSideNav: false
   };

   toggleSideNav = () => {
      let show = this.state.showSideNav;
      this.setState({
         showSideNav: !show
      });
   };

   closeSideNav = () => {
      this.setState({
         showSideNav: false
      });
   };

   render() {
      return (
         <>
            <Nav>
               <Logo>DopeStore</Logo>
               <Right>
                  <Icon name="search" />
                  <Icon name="cart" />
                  <Icon name="list" onClick={this.toggleSideNav} />
               </Right>
            </Nav>
            <SideNav
               display={this.state.showSideNav}
               close={this.closeSideNav}
            />
         </>
      );
   }
}

export default TopNav;
