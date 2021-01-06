import React, { useState } from 'react';
import Card from '../UI/Card';
import classes from './IngredientForm.module.css';

interface IState {
  title: string;
  amount: string;
}

const IngredientForm = React.memo(props => {
  let state:IState = {
    title: "",
    amount: ""
  }

  const inputState: [IState, React.Dispatch<React.SetStateAction<IState>>] = useState(state);

  const submitHandler = (event:any) => {
    event.preventDefault();
    // ...
  };

  return (
    <section className={classes.IngredientForm}>
      <Card>
        <form onSubmit={submitHandler}>
          <div className={classes.FormControl}>
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={inputState[0].title} onChange={event=> {
                const newTitle = event.target.value;
                inputState[1]((prevInputState)=>({ title: newTitle, amount: prevInputState.amount }))
              }
            }/>
          </div>
          <div className={classes.FormControl}>
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={inputState[0].amount} onChange={event=> {
                const newAmount = event.target.value;
                inputState[1]((prevInputState)=>({ amount: newAmount, title: prevInputState.title }))
              }
            }/>
          </div>
          <div className={classes.IngredientForm__actions}>
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
