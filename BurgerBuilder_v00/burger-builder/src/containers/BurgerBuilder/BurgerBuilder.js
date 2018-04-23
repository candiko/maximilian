import React, { Component } from "react";
import axios from "../../axios-orders";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Auxi from "../../hoc/Auxi/Auxi";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";

// CONSTANTS
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.6,
  bacon: 0.7,
  meat: 1.3
};

class BurgerBuilder extends Component {
  // STATE
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  // LIFE-CYCLE METHODS
  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  updatePurchaseState() {
    const ingredients = {
      ...this.state.ingredients
    };

    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => sum + el, 0);

    this.setState({ purchasable: sum > 0 });
  }

  // COMPONENT METHODS
  addIngredientHandler = type => {
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    this.setState(
      {
        totalPrice: updatedPrice,
        ingredients: updatedIngredients
      },
      () => {
        this.updatePurchaseState();
      }
    );
  };

  removeIngredientHandler = type => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }
    const updatedCount = this.state.ingredients[type] - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

    this.setState(
      {
        totalPrice: updatedPrice,
        ingredients: updatedIngredients
      },
      () => {
        this.updatePurchaseState();
      }
    );
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  closeModalHandler = () => {
    this.setState({ purchasing: false });
  };

  toCheckoutHandler = () => {
    this.setState({ loading: true });

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Daris Calinor",
        address: {
          street: "AC/DC Lane",
          zipCode: "3000",
          country: "Australia"
        },
        email: "daris@calinor.com"
      },
      deliveryMethod: "fastest"
    };

    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  // RENDER METHOD
  render() {
    // Iterate through for whether less button disabled or not
    const disabledInfo = {
      ...this.state.ingredients
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
    if (this.state.ingredients) {
      // If it is show burger
      burger = (
        <Auxi>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            addIngredient={this.addIngredientHandler}
            removeIngredient={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            clickOrder={this.purchaseHandler}
          />
        </Auxi>
      );

      // and assign order summary
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          closeModal={this.closeModalHandler}
          toCheckout={this.toCheckoutHandler}
          price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
