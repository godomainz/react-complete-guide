import React from 'react';
import './CharComponent.css'

const CharComponent = (props) => {
    return (
        <div className="characters" onClick={props.clicked}>
            {props.character}
        </div>
        
    );
};
export default CharComponent;