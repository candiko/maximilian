import React, { Component } from "react";
import Auxi from "../../hoc/Auxi";
import Burger from "../../components/Burger/Burger";

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
        <div>Builder</div>
      </Auxi>
    );
  }
}

export default BurgerBuilder;
