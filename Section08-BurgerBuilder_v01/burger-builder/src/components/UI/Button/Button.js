import React from "react";
import PropTypes from "prop-types";
import classes from "./Button.css";

const button = props => (
  <button
    onClick={props.clickButton}
    className={[classes.Button, classes[props.buttonType]].join(" ")}
  >
    {props.children}
  </button>
);

button.propTypes = {
  clickButton: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  buttonType: PropTypes.string
};

export default button;
