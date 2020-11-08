import React from 'react';

const WithClass = (props: any) => (
    <div className={props.classes}>
        { props.children }
    </div>
);
export default WithClass;