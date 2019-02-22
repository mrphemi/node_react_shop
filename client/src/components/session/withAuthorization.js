import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import verifyUser from "../../actions/verifyUser";

const withAuthorization = () => Component => {
   class withAuthorization extends React.Component {
      componentDidMount() {
         if (!this.props.authenticated) {
            this.props.history.push("/login");
         } else {
            this.props.verify(this.props.history);
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

   const mapDispatchToProps = dispatch => {
      return {
         verify: history => dispatch(verifyUser(history))
      };
   };

   return compose(
      withRouter,
      connect(
         mapStateToProps,
         mapDispatchToProps
      )
   )(withAuthorization);
};

export default withAuthorization;
