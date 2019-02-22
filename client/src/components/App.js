import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./home/Home";
import Login from "./login/Login";
import SignUp from "./signup/SignUp";
import Nav from "./nav/TopNav";
import Products from "./products/Products";
import Product from "./products/Product";
import CreateProduct from "./products/CreateProduct";

const App = () => (
   <Fragment>
      <Nav />
      <Switch>
         <Route exact path="/" component={Home} />
         <Route path="/login" component={Login} />
         <Route path="/signup" component={SignUp} />
         <Route exact path="/products" component={Products} />
         <Route exact path="/products/create" component={CreateProduct} />
         <Route exact path="/products/:productId" component={Product} />
      </Switch>
   </Fragment>
);

export default App;
