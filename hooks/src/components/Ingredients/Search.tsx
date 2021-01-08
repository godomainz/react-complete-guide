import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import classes from './Search.module.css';
import { Ingredient } from "./Ingredient"

interface Iprops {
  onLoadIngredients:(ingredients:Ingredient[])=>void;
}

const Search = React.memo((props:Iprops) => {
  const { onLoadIngredients } = props;
  const [enteredFilter, setEnteredFilter] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(()=>{
      if(inputRef.current){
        if(enteredFilter === inputRef.current.value){
          const query = enteredFilter.length === 0 ? "" : `?orderBy="title"&equalTo="${enteredFilter}"`;
          fetch("https://react-hooks-update-6f530-default-rtdb.firebaseio.com/ingredients.json"+query).then(response => {
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
            onLoadIngredients(loadedIngredients);
          });
        }
      }   
    } ,500);
    return () => {
      clearTimeout(timer);
    }
  },[enteredFilter, onLoadIngredients, inputRef]);

  return (
    <section className={classes.Search}>
      <Card>
        <div className={classes.SearchInput}>
          <label>Filter by Title</label>
          <input ref={inputRef} type="text" value={enteredFilter} onChange={event=>setEnteredFilter(event.target.value)} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
