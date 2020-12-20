import React, { Component } from 'react';
import {connect} from "react-redux";
import {decrement, increment,add,substract} from "../../store/actionTypes";
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import CounterState from "../../store/counterState";

// type Props = CounterState & typeof mapStateToProps & typeof mapDispatchToProps;
interface Props {
    ctr: number;
    onIncrementCounter: typeof mapDispatchToProps;
    onDecrementCounter: typeof mapDispatchToProps;
    onAddCounter: typeof mapDispatchToProps;
    onSubstractCounter:  typeof mapDispatchToProps;
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
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubstractCounter}  />
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
        onIncrementCounter: () => dispatch(increment()),
        onDecrementCounter : () => dispatch(decrement()),
        onAddCounter : () => dispatch(add()),
        onSubstractCounter : () => dispatch(substract()),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Counter);