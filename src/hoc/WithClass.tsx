import React from 'react';

const withClass = (WrappedComponent:any, className:string) => {
    return (props:any) => (
        <div className={className}>
            <WrappedComponent></WrappedComponent>
        </div>
    );
}
export default withClass;