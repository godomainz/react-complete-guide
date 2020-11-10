import React, { useEffect, useRef } from 'react';
import AuthContext from '../../context/auth-context';
import classes from './Cockpit.module.css';

const Cockpit = (props:any) => {

    const toggleBtnRef:any = useRef(null);
    

    useEffect(()=>{
      console.log('[Cockpit.tsx] useEffect');
      toggleBtnRef.current.click();
      return () => {
        console.log('[Cockpit.tsx] useEffect cleanup');
      };
    },[]);
    
    useEffect(()=>{
      console.log('[Cockpit.tsx] 2nd useEffect');
      return () => {
        console.log('[Cockpit.tsx] 2nd useEffect cleanup');
      };
    });

    const assignedClasses = [];

    let btnClass = '';
    if(props.showPersons){
        btnClass = classes.Red;
    }
    
    if(props.personsLength <=2){
      assignedClasses.push(classes.red);
    }
    if(props.personsLength <=1){
      assignedClasses.push(classes.bold);
    }

    
    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button ref={toggleBtnRef} className={btnClass} onClick={props.clicked}>Toggle Persons</button>
            <AuthContext.Consumer>
              {
                (context) => <button onClick={context.login}>Log In</button>
              }
              </AuthContext.Consumer>
            
        </div>
        
    );

}
    


export default React.memo(Cockpit);