import React from 'react';
import classes from './CounterControl.module.css';

const counterControl = (props:any) => (
    <div className={classes.CounterControl} onClick={props.clicked}>
        {props.label}
    </div>
);

export default counterControl;