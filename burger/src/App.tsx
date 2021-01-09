import React, { useEffect, Suspense } from "react";
import { connect } from "react-redux";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import { Route, Switch, withRouter, RouteComponentProps, Redirect } from "react-router-dom";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

interface Props extends RouteComponentProps {
  onTryAutoignup: () => void,
  isAuthenticated: boolean;
}

const Checkout = React.lazy(()=>{
  return import("./containers/Checkout/Checkout");
});

const Orders = React.lazy(()=>{
  return import("./containers/Checkout/Orders/Orders");
});

const Auth = React.lazy(()=>{
  return import("./containers/Auth/Auth");
});

const App = (props:Props) => {
  const { onTryAutoignup } = props;

  useEffect(()=>{
    onTryAutoignup();
  }, [onTryAutoignup]);

    let routes = (
      <Switch>
        <Route path="/auth" render={(props)=><Auth/>} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if (props.isAuthenticated){
      routes = (
        <Switch>
          <Route path="/checkout" render={(props)=><Checkout {...props}/>} />
          <Route path="/orders" render={(props)=><Orders {...props}/>} />
          <Route path="/auth" render={(props)=><Auth/>} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          <Suspense fallback={<p>Loading</p>}>{routes}</Suspense>
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
