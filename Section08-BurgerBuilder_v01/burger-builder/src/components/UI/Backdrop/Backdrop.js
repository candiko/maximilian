import React from "react";
import PropTypes from "prop-types";
import classes from "./Backdrop.css";

const backdrop = props =>
  props.show ? (
    <div className={classes.Backdrop} onClick={props.closeModal} />
  ) : null;

backdrop.propTypes = {
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default backdrop;
