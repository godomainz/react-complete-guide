import React, { Component } from "react";
import Aux from '../../../hoc/Auxilary';
import BackDrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

interface Props {
   show: boolean;
   modalClosed: any;
}

class Modal extends Component<Props> {

    shouldComponentUpdate(nextProps:any,nextState:any){
        return nextProps.show !== this.props.show            
    }

    componentDidUpdate(){
        console.log('[Modal.tsx] componentDidUpdate');
    }

    render(){
 
        return (
            <Aux>
                <BackDrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={classes.Modal} style={
                    {
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' :'0'
                    }
                }>
                {this.props.children}
                </div>
            </Aux>
        )
    }
    
}

export default Modal;