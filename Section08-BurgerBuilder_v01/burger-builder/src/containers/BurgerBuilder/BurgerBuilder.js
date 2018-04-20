import React, { Component } from "react";
import Auxi from "../../hoc/Auxi";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

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
    totalPrice: 4
  };

  addIngredientHandler = type => {
    // Handle ingredient addition
    const updatedCount = this.state.ingredients[type] + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    // Handle price addition
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

    // Update state
    this.setState({
      totalPrice: updatedPrice,
      ingredients: updatedIngredients
    });
  };

  removeIngredientHandler = () => {};

  render() {
    return (
      <Auxi>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls addition={this.addIngredientHandler} />
      </Auxi>
    );
  }
}

export default BurgerBuilder;
