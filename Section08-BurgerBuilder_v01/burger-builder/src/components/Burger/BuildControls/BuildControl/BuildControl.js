import React from "react";
import PropTypes from "prop-types";
import classes from "./BuildControl.css";

const buildControl = props => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button className={classes.Less}>Less</button>
      <button className={classes.More} onClick={props.clickMore}>
        More
      </button>
    </div>
  );
};

buildControl.propTypes = {
  label: PropTypes.string.isRequired,
  clickMore: PropTypes.func.isRequired
};

export default buildControl;
