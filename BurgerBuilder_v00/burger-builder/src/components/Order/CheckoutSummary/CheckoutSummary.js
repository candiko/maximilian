import React from "react";
import PropTypes from "prop-types";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";

import classes from "./CheckoutSummary.css";

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button buttonType="Danger" clickButton={props.cancelOrder}>
        CANCEL
      </Button>
      <Button buttonType="Success" clickButton={props.continueOrder}>
        CONTINUE
      </Button>
    </div>
  );
};

checkoutSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  cancelOrder: PropTypes.func.isRequired,
  continueOrder: PropTypes.func.isRequired
};

export default checkoutSummary;
