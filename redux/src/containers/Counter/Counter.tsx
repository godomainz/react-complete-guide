import React, { Component } from 'react';
import {connect} from "react-redux";
import {increment} from "../../store/actionTypes";
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import CounterState from "../../store/counterState";

interface Props {
    ctr: number;
    onIncrementCounter: typeof mapDispatchToProps;
}

class Counter extends Component<Props> {
    state:CounterState = {
        counter: 0
    }

    counterChangedHandler = ( action:any, value?:any ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState:any ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState:any ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState:any ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState:any ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={() => this.counterChangedHandler( 'dec' )}  />
                <CounterControl label="Add 5" clicked={() => this.counterChangedHandler( 'add', 5 )}  />
                <CounterControl label="Subtract 5" clicked={() => this.counterChangedHandler( 'sub', 5 )}  />
            </div>
        );
    }
}

const mapStateToProps = (state:CounterState) => {
    return {
        ctr: state.counter
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        onIncrementCounter: () => dispatch(increment())
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Counter);