import React, { useState } from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';
import { Ingredient } from "./Ingredient"

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState<Ingredient[]>([])

  const addIngredientHandler = (ingredient:Ingredient) => {
    setUserIngredients((prevIngredients:Ingredient[]) => [...prevIngredients,{
      id: Math.random().toString(),
      ...ingredient
    }]);
    console.log(ingredient);
    console.log(userIngredients);
  }
  const removeIngredientHandler = (id:string) => {
    setUserIngredients((prevIngredients:Ingredient[])=>{
      return prevIngredients.filter((ingredient:Ingredient)=> ingredient.id !== id )
    })
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
