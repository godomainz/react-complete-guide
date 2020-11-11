import React from 'react';

const withClass = (WrappedComponent:any, className:string) => {
    return (props:any) => (
        <div className={className}>
            <WrappedComponent {...props}></WrappedComponent>
        </div>
    );
}
export default withClass;