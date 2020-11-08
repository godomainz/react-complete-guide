import React, { useEffect } from 'react';
import classes from './Cockpit.module.css';

const Cockpit = (props:any) => {
    useEffect(()=>{
      console.log('[Cockpit.tsx] useEffect');
      // Http request...
      setTimeout(()=>{
        alert('Saved data to the cloud');
      },1000);
    },[]);
    
    const assignedClasses = [];

    let btnClass = '';
    if(props.showPersons){
        btnClass = classes.Red;
    }
    
    if(props.persons.length <=2){
      assignedClasses.push(classes.red);
    }
    if(props.persons.length <=1){
      assignedClasses.push(classes.bold);
    }

    
    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button className={btnClass} onClick={props.clicked}>Toggle Persons</button>
        </div>
        
    );

}
    


export default Cockpit;