import React from 'react';
import classes from './Backdrop.module.css';

const  BackDrop = (props:any) => {
      console.log(props);
     return(
        props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
     );

}

export default BackDrop;