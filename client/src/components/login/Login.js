import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { login } from "../../actions/login";
import withAuthentication from "../session/withAuthentication";

class Login extends Component {
   state = {
      email: "",
      password: ""
   };

   login = e => {
      e.preventDefault();
      this.props.login(this.state);
   };

   onChange = e => {
      this.setState({
         [e.target.name]: e.target.value
      });
   };

   render() {
      return (
         <form onSubmit={this.login}>
            <input
               type="email"
               name="email"
               id="email"
               placeholder="Enter your email"
               onChange={this.onChange}
            />
            <input
               type="password"
               name="password"
               id="password"
               placeholder="Enter password"
               onChange={this.onChange}
            />
            <input type="submit" value="Submit" />
         </form>
      );
   }
}

const mapDispatchToProps = dispatch => {
   return {
      login: user => dispatch(login(user))
   };
};

export default compose(
   connect(
      null,
      mapDispatchToProps
   ),
   withAuthentication()
)(Login);
