import React from "react";
import PropTypes from "prop-types";
import Auxi from "../../../hoc/Auxi";

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
        {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <Auxi>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to checkout?</p>
    </Auxi>
  );
};

orderSummary.propTypes = {
  ingredients: PropTypes.object.isRequired
};

export default orderSummary;
