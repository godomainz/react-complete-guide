import React from 'react';
import classes from './Modal.module.css';

const  Modal = (props:any) => (
    <div className={classes.Modal}>
        {props.children}
    </div>
)

export default Modal;