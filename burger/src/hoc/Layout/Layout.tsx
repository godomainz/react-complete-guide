import React, { useState } from "react";
import Aux from "../Auxilary/Auxilary";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";
import { connect } from "react-redux";

interface Props {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

const Layout = (props:Props) => {
  
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  }

  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible)
  }


    return (
      <Aux>
        <Toolbar isAuth={props.isAuthenticated} drawerToggleClicked={sideDrawerToggleHandler} />
        <SideDrawer 
          isAuth={props.isAuthenticated}
          open={sideDrawerIsVisible} 
          closed={sideDrawerClosedHandler}/>
        <main className={classes.Content}>{props.children}</main>
      </Aux>
    );
  
  
}

const mapStateToProps = (state:any) => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}


export default connect(mapStateToProps)(Layout);