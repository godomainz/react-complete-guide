import React, { useState, useEffect } from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';
import { Ingredient } from "./Ingredient"

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState<Ingredient[]>([])

  useEffect(() =>{
    fetch("https://react-hooks-update-6f530-default-rtdb.firebaseio.com/ingredients.json").then(response => {
      return response.json();
    }).then(responseData => {
      const loadedIngredients = [];
      for (const key in responseData){
        loadedIngredients.push({
          id: key,
          title: responseData[key].title,
          amount: responseData[key].amount
        });
      }
      setUserIngredients(loadedIngredients);
    });
  },[]);

  useEffect(() => {
    console.log("RENDERING INGREDIENTS ", userIngredients);
  },[userIngredients]);

  const filteredIngredientsHandler = (filteredIngredients:Ingredient[]) => {
    setUserIngredients(filteredIngredients);
  }

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
    setUserIngredients((prevIngredients:Ingredient[])=>{
      return prevIngredients.filter((ingredient:Ingredient)=> ingredient.id !== id )
    })
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
