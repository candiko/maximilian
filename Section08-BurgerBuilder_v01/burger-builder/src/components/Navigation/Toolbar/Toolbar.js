import React from "react";
import PropTypes from "prop-types";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import Logo from "../../Logo/Logo";
import classes from "./Toolbar.css";

const toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.toggleSideDrawer} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

toolbar.propTypes = {
  toggleSideDrawer: PropTypes.func.isRequired
};

export default toolbar;
