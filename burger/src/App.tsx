import React, { useEffect } from "react";
import { connect } from "react-redux";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, withRouter, RouteComponentProps, Redirect } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

interface Props extends RouteComponentProps {
  onTryAutoignup: () => void,
  isAuthenticated: boolean;
}

const asyncCheckout = asyncComponent(()=>{
  return import("./containers/Checkout/Checkout");
});

const asyncOrders = asyncComponent(()=>{
  return import("./containers/Checkout/Orders/Orders");
});

const asyncAuth = asyncComponent(()=>{
  return import("./containers/Auth/Auth");
});

const App = (props:Props) => {

  useEffect(()=>{
    props.onTryAutoignup();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
}

const mapStateToProps = (state:any) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
      onTryAutoignup: () => dispatch(actions.authCheckState())
  };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
