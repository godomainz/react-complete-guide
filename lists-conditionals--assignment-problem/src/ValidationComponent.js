import React from 'react';

const ValidationComponent = (props) => {
    let text = 'Text too short';
    if(props.text.length>=5){
        text = 'Text long enough';
    }
    return (
        <p>{text}</p>
    );
};
export default ValidationComponent;