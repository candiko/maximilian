import React from "react";
import PropTypes from "prop-types";
import Auxi from "../../../hoc/Auxi/Auxi";
import Button from "../../UI/Button/Button";

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
      <p>
        <strong>Total Price: ${props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button clickButton={props.closeModal} buttonType={"Danger"}>
        CANCEL
      </Button>
      <Button clickButton={props.toCheckout} buttonType={"Success"}>
        CONTINUE
      </Button>
    </Auxi>
  );
};

orderSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  toCheckout: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired
};

export default orderSummary;
