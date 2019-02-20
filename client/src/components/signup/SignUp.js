import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "recompose";

import { registerUser } from "../../actions/signup";
import withAuthentication from "../session/withAuthentication";

class SignUp extends Component {
   state = {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
   };

   componentDidMount() {
      if (this.props.authenticated) {
         this.props.history.push("/");
      }
   }

   onChange = e => {
      this.setState({
         [e.target.name]: e.target.value
      });
   };

   signUp = e => {
      let details = this.state;
      e.preventDefault();
      this.props.signup(details, this.props.history);
   };

   render() {
      return (
         <form onSubmit={this.signUp}>
            <input
               type="text"
               name="firstName"
               id="firstName"
               placeholder="Enter first name"
               onChange={this.onChange}
            />
            <input
               type="text"
               name="lastName"
               id="lastName"
               placeholder="Enter last name"
               onChange={this.onChange}
            />
            <input
               type="email"
               name="email"
               id="email"
               placeholder="Enter valid email"
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
      signup: (details, history) => dispatch(registerUser(details, history))
   };
};

export default compose(
   connect(
      null,
      mapDispatchToProps
   ),
   withAuthentication()
)(SignUp);
