import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./home/Home";
import Login from "./login/Login";
import SignUp from "./signup/SignUp";
import Nav from "./nav/TopNav";
import Products from "./products/Products";
import Product from "./products/Product";

const App = () => (
   <Fragment>
      <Nav />
      <Switch>
         <Route exact path="/" component={Home} />
         <Route path="/login" component={Login} />
         <Route path="/signup" component={SignUp} />
         <Route exact path="/products/:productId" component={Product} />
         <Route path="/products" component={Products} />
      </Switch>
   </Fragment>
);

export default App;
