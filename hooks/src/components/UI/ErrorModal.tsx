import React from 'react';

import classes from './ErrorModal.module.css';

const ErrorModal = React.memo((props:any) => {
  return (
    <React.Fragment>
      <div className={classes.Backdrop} onClick={props.onClose} />
      <div className={classes.ErrorModal}>
        <h2>An Error Occurred!</h2>
        <p>{props.children}</p>
        <div className={classes.ErrorModal__actions}>
          <button type="button" onClick={props.onClose}>
            Okay
          </button>
        </div>
      </div>
    </React.Fragment>
  );
});

export default ErrorModal;
