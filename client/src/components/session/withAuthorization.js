import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

const withAuthorization = () => Component => {
   class withAuthorization extends React.Component {
      componentDidMount() {
         if (!this.props.authenticated) {
            this.props.history.push("/login");
         }
      }

      render() {
         return <Component {...this.props} />;
      }
   }

   const mapStateToProps = state => {
      return {
         authenticated: state.auth.isAuthenticated,
         user: state.auth.user
      };
   };

   return compose(
      withRouter,
      connect(mapStateToProps)
   )(withAuthorization);
};

export default withAuthorization;
