import React from 'react';

import Card from '../UI/Card';
import classes from './Search.module.css';

const Search = React.memo((props:any) => {
  return (
    <section className={classes.Search}>
      <Card>
        <div className={classes.SearchInput}>
          <label>Filter by Title</label>
          <input type="text" />
        </div>
      </Card>
    </section>
  );
});

export default Search;
