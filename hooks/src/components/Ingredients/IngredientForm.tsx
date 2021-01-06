import React from 'react';

import Card from '../UI/Card';
import classes from './IngredientForm.module.css';

const IngredientForm = React.memo(props => {
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
            <input type="text" id="title" />
          </div>
          <div className={classes.FormControl}>
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" />
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
