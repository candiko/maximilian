import React, { Component } from "react";
import axios from "../../axios-orders";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

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
    purchasing: false,
    loading: false,
    error: false
  };

  // LIFE-CYCLE METHODS
  componentDidMount() {
    // axios
    //   .get("/ingredients.json")
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(error => {
    //     this.setState({ error: true });
    //   });
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
    let burger = this.state.error ? (
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

    // Check for order is submitting
    if (this.state.loading) {
      orderSummary = <Spinner />;
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
    ings: state.ingredients,
    totalPrice: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: ingName =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(BurgerBuilder, axios)
);
