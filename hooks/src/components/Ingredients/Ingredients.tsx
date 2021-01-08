import React, { useReducer, useEffect, useCallback } from 'react';
import IngredientForm from './IngredientForm';
import IngredientList from "./IngredientList";
import Search from './Search';
import { Ingredient } from "./Ingredient";
import ErrorModal from "../UI/ErrorModal";

type HttpStateType = {
  loading:boolean;
  error:string | null;
}
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

const httpReducer = (curHttpState:HttpStateType, action:any):HttpStateType => {
  switch(action.type){
    case "SEND":
      return { loading: true, error: null };
    case "RESPONSE":
      return {...curHttpState, loading: false};
    case "ERROR":
      return {loading: false, error: action.errorMessage};
    case "CLEAR":
      return {...curHttpState, error: null};
    default:
      throw new Error("Should not be reached!");
  }
}

const Ingredients = () => {
  const [userIngredients, dispatch]=useReducer(ingredientReducer,[])
  const [httpState, dispatchHttp] = useReducer(httpReducer, {loading: false, error: null});

  useEffect(() => {
    console.log("RENDERING INGREDIENTS ", userIngredients);
  },[userIngredients]);

  const filteredIngredientsHandler = useCallback((filteredIngredients:Ingredient[]) => {
    dispatch({type: "SET",ingredients: filteredIngredients})
  },[])

  const addIngredientHandler = (ingredient:Ingredient) => {
    dispatchHttp({type:"SEND"});

    fetch("https://react-hooks-update-6f530-default-rtdb.firebaseio.com/ingredients.json",{
        method:"POST",
        body: JSON.stringify(ingredient),
        headers: { "Content-Type": "application/json;" }
      }
    ).then(response => {
      dispatchHttp({type:"RESPONSE"});
      return response.json();
    }).then(responseData => {
      dispatch({type: "ADD", ingredient: { id: responseData.name, ...ingredient }});
    }).catch(error=>{
      dispatchHttp({type:"ERROR", errorMessage: error.message});
    });;
  }

  const removeIngredientHandler = (id:string) => {
    dispatchHttp({type:"SEND"});
    fetch(`https://react-hooks-update-6f530-default-rtdb.firebaseio.com/ingredients/${id}.json`,{
      method:"DELETE"
    }).then(()=>{
      dispatchHttp({type:"RESPONSE"});
      dispatch({type: "DELETE", id: id });
    }).catch(error=>{
      dispatchHttp({type:"ERROR", errorMessage: error.message});
    });
  }

  const clearError = () => {
    dispatchHttp({type:"CLEAR"});
  }

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading}/>
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
