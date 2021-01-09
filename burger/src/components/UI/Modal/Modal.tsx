import React from "react";
import Aux from '../../../hoc/Auxilary/Auxilary';
import BackDrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css';

type Props = {
   show: boolean;
   modalClosed?: any;
   children: any;
}

const Modal = (props:Props) => {

        return (
            <Aux>
                <BackDrop show={props.show} clicked={props.modalClosed}/>
                <div className={classes.Modal} style={
                    {
                        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' :'0'
                    }
                }>
                {props.children}
                </div>
            </Aux>
        )
    
}

export default React.memo(Modal, (prevProps, nextProps)=>nextProps.show === prevProps.show && nextProps.children === prevProps.children);