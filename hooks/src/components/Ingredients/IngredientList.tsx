import React from 'react';

import classes from './IngredientList.module.css';
import { Ingredient } from "./Ingredient"
interface Iprops {
  onRemoveItem:(id:string)=>void;
  ingredients: Ingredient[];
}

const IngredientList = (props:Iprops) => {
  return (
    <section className={classes.IngredientList}>
      <h2>Loaded Ingredients</h2>
      <ul>
        {props.ingredients.map((ig:any) => (
          <li key={ig.id} onClick={props.onRemoveItem.bind(this, ig.id)}>
            <span>{ig.title}</span>
            <span>{ig.amount}x</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default IngredientList;
