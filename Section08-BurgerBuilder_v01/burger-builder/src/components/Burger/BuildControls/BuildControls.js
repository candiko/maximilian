import React from "react";
import PropTypes from "prop-types";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => {
  const buildControlList = controls.map(ctrl => (
    <BuildControl
      key={ctrl.label}
      label={ctrl.label}
      clickMore={() => props.addition(ctrl.type)}
    />
  ));

  return <div className={classes.BuildControls}>{buildControlList}</div>;
};

buildControls.propTypes = {
  addition: PropTypes.func.isRequired
};

export default buildControls;
