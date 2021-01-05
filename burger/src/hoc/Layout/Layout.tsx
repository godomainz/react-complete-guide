import React, { Component } from "react";
import Aux from "../Auxilary/Auxilary";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";
import { connect } from "react-redux";

interface Props {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

class Layout extends Component<Props> {
  
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState:any)=>{
      return {showSideDrawer: !prevState.showSideDrawer}
    });
  }

  render() {
    return (
      <Aux>
        <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer 
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer} 
          closed={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
  
}

const mapStateToProps = (state:any) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}


export default connect(mapStateToProps)(Layout);