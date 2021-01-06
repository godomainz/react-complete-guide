import React, { Component } from "react";
import { connect } from "react-redux";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch, withRouter, RouteComponentProps } from "react-router-dom";
import Orders from "./containers/Checkout/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

interface Props extends RouteComponentProps {
  onTryAutoignup: () => void
}

class App extends Component<Props> {

  componentDidMount() {
    this.props.onTryAutoignup()
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch:any) => {
  return {
      onTryAutoignup: () => dispatch(actions.authCheckState())
  };
}

export default withRouter(connect(null,mapDispatchToProps)(App));
