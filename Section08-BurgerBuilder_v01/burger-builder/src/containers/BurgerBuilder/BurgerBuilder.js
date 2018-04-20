import React, { Component } from "react";
import Auxi from "../../hoc/Auxi";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      bacon: 2,
      meat: 2,
      salad: 1,
      cheese: 3
    }
  };

  render() {
    return (
      <Auxi>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls />
      </Auxi>
    );
  }
}

export default BurgerBuilder;
