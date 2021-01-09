import React, { useReducer,useEffect, useCallback, useMemo } from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';
import { Ingredient } from "./Ingredient";
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../../hooks/http";


const ingredientReducer = (currentIngredients:Ingredient[], action:any) => {
  switch(action.type){
    case "SET":
      return action.ingredients;
    case "ADD":
      return [...currentIngredients, action.ingredient];
    case "DELETE":
      return currentIngredients.filter(ing => ing.id !== action.id);
    default:
      throw new Error("Should not get there!");
  }
}



const Ingredients = () => {
  const [userIngredients, dispatch]=useReducer(ingredientReducer,[]);
  const { isLoading, error, data, sendRequest, reqExtra, reqIdentifier } = useHttp();

  useEffect(() => {
    if(!isLoading && !error && reqIdentifier === "REMOVE_INGREDIENT"){
      dispatch({type: "DELETE", id: reqExtra});
    }else if(!isLoading && !error && reqIdentifier === "ADD_INGREDIENT"){
      dispatch({type: "ADD", ingredient: { id: data.name, ...reqExtra }});
    }
  },[data, reqExtra, reqIdentifier, isLoading, error]);

  const filteredIngredientsHandler = useCallback((filteredIngredients:Ingredient[]) => {
    dispatch({type: "SET",ingredients: filteredIngredients});
  },[])

  const addIngredientHandler = useCallback((ingredient:Ingredient) => {
    sendRequest("https://react-hooks-update-6f530-default-rtdb.firebaseio.com/ingredients.json", "POST", 
    JSON.stringify(ingredient), ingredient, "ADD_INGREDIENT");
  },[sendRequest])

  const removeIngredientHandler = useCallback((id:string) => {
    sendRequest(`https://react-hooks-update-6f530-default-rtdb.firebaseio.com/ingredients/${id}.json`, "DELETE", null, id, "REMOVE_INGREDIENT")
  },[sendRequest]);

  const clearError = useCallback(() => {
    // dispatchHttp({type:"CLEAR"});
  },[]);

  const ingredientList = useMemo(()=>{
    return (
    <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
    );
  },[userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading}/>
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
