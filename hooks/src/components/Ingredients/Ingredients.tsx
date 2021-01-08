import React, { useState, useEffect, useCallback } from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';
import { Ingredient } from "./Ingredient"

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState<Ingredient[]>([])

  useEffect(() => {
    console.log("RENDERING INGREDIENTS ", userIngredients);
  },[userIngredients]);

  const filteredIngredientsHandler = useCallback((filteredIngredients:Ingredient[]) => {
    setUserIngredients(filteredIngredients);
  },[])

  const addIngredientHandler = (ingredient:Ingredient) => {
    fetch("https://react-hooks-update-6f530-default-rtdb.firebaseio.com/ingredients.json",{
      method:"POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-Type": "application/json;" }
    }).then(response => {
      return response.json();
    }).then(responseData => {
      setUserIngredients((prevIngredients:Ingredient[]) => [...prevIngredients,{
        id: responseData.name,
        ...ingredient
      }]);
    });
  }

  const removeIngredientHandler = (id:string) => {
    fetch(`https://react-hooks-update-6f530-default-rtdb.firebaseio.com/ingredients/${id}.json`,{
      method:"DELETE"
    }).then(()=>{
      setUserIngredients((prevIngredients:Ingredient[])=>{
        return prevIngredients.filter((ingredient:Ingredient)=> ingredient.id !== id )
      });
    });
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
