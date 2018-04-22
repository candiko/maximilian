import React, { Component } from "react";
import axios from "../../axios-orders";
import Auxi from "../../hoc/Auxi/Auxi";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.6,
  bacon: 0.7,
  meat: 1.3
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      bacon: 0,
      meat: 0,
      salad: 0,
      cheese: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

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
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  render() {
    // Iterate through for whether less button disabled or not
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Auxi>
        <Modal show={this.state.purchasing} closeModal={this.closeModalHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            closeModal={this.closeModalHandler}
            toCheckout={this.toCheckoutHandler}
            price={this.state.totalPrice}
          />
        </Modal>

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
  }
}

export default BurgerBuilder;
