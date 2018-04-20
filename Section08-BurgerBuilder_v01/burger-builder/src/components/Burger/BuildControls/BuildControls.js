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
      clickMore={() => props.addIngredient(ctrl.type)}
      clickLess={() => props.removeIngredient(ctrl.type)}
      isDisabled={props.disabledInfo[ctrl.type]}
    />
  ));

  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>${props.price.toFixed(2)}</strong>
      </p>
      {buildControlList}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.clickOrder}
      >
        ORDER NOW!
      </button>
    </div>
  );
};

buildControls.propTypes = {
  addIngredient: PropTypes.func.isRequired,
  removeIngredient: PropTypes.func.isRequired,
  disabledInfo: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
  purchasable: PropTypes.bool.isRequired,
  clickOrder: PropTypes.func.isRequired
};

export default buildControls;
