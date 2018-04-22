import React from "react";
import PropTypes from "prop-types";
import Logo from "../../Logo/Logo";
import Auxi from "../../../hoc/Auxi/Auxi";
import Backdrop from "../../UI/Backdrop/Backdrop";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";

const sideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Auxi>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Auxi>
  );
};

sideDrawer.propTypes = {
  closed: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default sideDrawer;
