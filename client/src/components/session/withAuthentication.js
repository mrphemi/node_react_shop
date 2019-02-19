import React from "react";
import { connect } from "react-redux";

const withAuthentication = () => Component => {
   const withAuthentication = props => <Component {...props} />;
   const mapStateToProps = state => {
      return {
         authenticated: state.auth.isAuthenticated
      };
   };
   return connect(mapStateToProps)(withAuthentication);
};

export default withAuthentication;
