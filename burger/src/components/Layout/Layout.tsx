import React from "react";
import Aux from "../../hoc/Auxilary";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import classes from "./Layout.module.css";
const Layout = (props: any) => (
  <Aux>
    <Toolbar />
    <SideDrawer />
    <main className={classes.Content}>{props.children}</main>
  </Aux>
);

export default Layout;
