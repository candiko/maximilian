import React from "react";
import PropTypes from "prop-types";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.css";

const burger = props => {
  let ingredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, index) => {
        return <BurgerIngredient key={igKey + index} type={igKey} />;
      });
    })
    .reduce((arr, el) => arr.concat(el), []);

  if (ingredients.length === 0) {
    ingredients = (
      <div>
        <p>Please add ingredients to</p>
        <p>MAKE THE BURGER GREAT AGAIN!</p>
      </div>
    );
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

burger.propTypes = {
  ingredients: PropTypes.object.isRequired
};

export default burger;
