import React from 'react';
import classes from './AddPerson.module.css';

const AddPerson = (props:any) => (
    <div className={classes.AddPerson}>
            <button onClick={props.personAdded}>Add Person</button>
    </div>
);

export default AddPerson;