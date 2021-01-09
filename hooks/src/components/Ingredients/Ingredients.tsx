import React, { useReducer, useCallback, useMemo } from 'react';
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
  const [userIngredients, dispatch]=useReducer(ingredientReducer,[])
  
  const { isLoading, error, data, sendRequest } = useHttp();

  // useEffect(() => {
  //   console.log("RENDERING INGREDIENTS ", userIngredients);
  // },[userIngredients]);

  const filteredIngredientsHandler = useCallback((filteredIngredients:Ingredient[]) => {
    dispatch({type: "SET",ingredients: filteredIngredients})
  },[])

  const addIngredientHandler = useCallback((ingredient:Ingredient) => {
    // dispatchHttp({type:"SEND"});

    // fetch("https://react-hooks-update-6f530-default-rtdb.firebaseio.com/ingredients.json",{
    //     method:"POST",
    //     body: JSON.stringify(ingredient),
    //     headers: { "Content-Type": "application/json;" }
    //   }
    // ).then(response => {
    //   dispatchHttp({type:"RESPONSE"});
    //   return response.json();
    // }).then(responseData => {
    //   dispatch({type: "ADD", ingredient: { id: responseData.name, ...ingredient }});
    // }).catch(error=>{
    //   dispatchHttp({type:"ERROR", errorMessage: error.message});
    // });
  },[])

  const removeIngredientHandler = useCallback((id:string) => {
    // dispatchHttp({type:"SEND"});
    sendRequest(`https://react-hooks-update-6f530-default-rtdb.firebaseio.com/ingredients/${id}.json`, "DELETE")
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
