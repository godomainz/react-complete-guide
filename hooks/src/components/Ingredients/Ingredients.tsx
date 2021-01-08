import React, { useReducer, useState, useEffect, useCallback } from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';
import { Ingredient } from "./Ingredient";
import ErrorModal from "../UI/ErrorModal";

const ingredientReducer = (currentIngredients:Ingredient[], action:any) => {
  switch(action.type){
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error("SHould not get there!");
  }
}

const Ingredients = () => {
  const [userIngredients, dispatch]=useReducer(ingredientReducer,[])
  // const [userIngredients, setUserIngredients] = useState<Ingredient[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    console.log("RENDERING INGREDIENTS ", userIngredients);
  },[userIngredients]);

  const filteredIngredientsHandler = useCallback((filteredIngredients:Ingredient[]) => {
    // setUserIngredients(filteredIngredients);
    dispatch({type: "SET",ingredients: filteredIngredients})
  },[])

  const addIngredientHandler = (ingredient:Ingredient) => {
    setIsLoading(true);
    fetch("https://react-hooks-update-6f530-default-rtdb.firebaseio.com/ingredients.json",{
      method:"POST",
      body: JSON.stringify(ingredient),
      headers: { "Content-Type": "application/json;" }
    }).then(response => {
      setIsLoading(false);
      return response.json();
    }).then(responseData => {
      // setUserIngredients((prevIngredients:Ingredient[]) => [...prevIngredients,{
      //   id: responseData.name,
      //   ...ingredient
      // }]);
      dispatch({type: "ADD", ingredient: { id: responseData.name, ...ingredient }});
    }).catch(error=>{
      setIsLoading(false);
      setError(error.message);
    });;
  }

  const removeIngredientHandler = (id:string) => {
    setIsLoading(true);
    fetch(`https://react-hooks-update-6f530-default-rtdb.firebaseio.com/ingredients/${id}.json`,{
      method:"DELETE"
    }).then(()=>{
      setIsLoading(false);
      // setUserIngredients((prevIngredients:Ingredient[])=>{
      //   return prevIngredients.filter((ingredient:Ingredient)=> ingredient.id !== id )
      // });
      dispatch({type: "DELETE", id: id });
    }).catch(error=>{
      setIsLoading(false);
      setError(error.message);
    });
  }

  const clearError = () => {
    setError(null);
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading}/>
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
