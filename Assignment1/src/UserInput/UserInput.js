import React from 'react';

const UserInput = (props) =>{
    const style = {
        backgroundColor: 'white',
        font: 'inherit',
        border: '1px solid blue',
        padding: '8px',
        cursor: 'pointer'
      }
    return (
        <div>
            <input style={style} type="text" onChange={props.onChange} value={props.userName}/>
        </div>
        
    );
}

export default UserInput;