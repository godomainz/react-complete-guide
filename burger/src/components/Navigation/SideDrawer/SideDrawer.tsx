import React from 'react';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Logo from '../../Logo/Logo';
import BackDrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';

const SideDrawer = (props:any) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

     return(
         <Aux>
            <BackDrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}></NavigationItems>
                </nav>
            </div>
         </Aux>
        
     );

}

export default SideDrawer;