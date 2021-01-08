import React, { useState } from 'react';
import Card from '../UI/Card';
import classes from './IngredientForm.module.css';
import { Ingredient } from "./Ingredient";
import LoadingIndicator from "../UI/LoadingIndicator";

interface IProps {
  onAddIngredient: (ingredient: Ingredient) => void;
  loading: boolean;
}
const IngredientForm = React.memo((props:IProps) => {

   const title:string = "";
   const amount:string = ""
 
  const [enteredTitle ,setEnteredTitle] = useState<string>(title);
  const [enteredAmount ,setEnteredAmmount] = useState<string>(amount);

  const submitHandler = (event:any) => {
    event.preventDefault();
    props.onAddIngredient({title:enteredTitle,amount: enteredAmount})
  };

  return (
    <section className={classes.IngredientForm}>
      <Card>
        <form onSubmit={submitHandler}>
          <div className={classes.FormControl}>
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={enteredTitle} onChange={event=> {
                setEnteredTitle(event.target.value);
              }
            }/>
          </div>
          <div className={classes.FormControl}>
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={enteredAmount} onChange={event=> {
                setEnteredAmmount(event.target.value);
              }
            }/>
          </div>
          <div className={classes.IngredientForm__actions}>
            <button type="submit">Add Ingredient</button>
            {props.loading && <LoadingIndicator />}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
