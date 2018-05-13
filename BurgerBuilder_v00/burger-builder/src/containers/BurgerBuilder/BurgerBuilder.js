import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import axios from "../../axios-orders";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Auxi from "../../hoc/Auxi/Auxi";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";

class BurgerBuilder extends Component {
  // STATE
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredient();
  }

  updatePurchaseState() {
    const ingredients = {
      ...this.props.ings
    };

    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  }

  // COMPONENT METHODS

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  closeModalHandler = () => {
    this.setState({ purchasing: false });
  };

  toCheckoutHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  // RENDER METHOD
  render() {
    // Iterate through for whether less button disabled or not
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    // Spinner while fetching/posting data
    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients can not be loaded.</p>
    ) : (
      <Spinner />
    );

    // Check for ingredients are loaded
    if (this.props.ings) {
      // If it is show burger
      burger = (
        <Auxi>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemoved}
            disabledInfo={disabledInfo}
            price={this.props.totalPrice}
            purchasable={this.updatePurchaseState()}
            clickOrder={this.purchaseHandler}
          />
        </Auxi>
      );

      // and assign order summary
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          closeModal={this.closeModalHandler}
          toCheckout={this.toCheckoutHandler}
          price={this.props.totalPrice}
        />
      );
    }

    // RETURN JSX
    return (
      <Auxi>
        <Modal show={this.state.purchasing} closeModal={this.closeModalHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxi>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
    onInitIngredient: () => dispatch(actions.initIngredient()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(BurgerBuilder, axios)
);
