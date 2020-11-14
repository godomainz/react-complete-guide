import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'salad' },
];

const  BuildControls = (props:any) => (
    <div className={classes.BuildControls}>
        { controls.map(ctrl => {
                return <BuildControl key={ctrl.label} label={ctrl.label} added={() => props.ingredientAdded(ctrl.type)}/>
            }) 
        }
    </div>
    
)

export default BuildControls;