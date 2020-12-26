import React, { Component } from 'react';
import {connect} from "react-redux";
import * as actionCreators from "../../store/actions/index";
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import CounterState from "../../store/states/counterState";

// type Props = CounterState & typeof mapStateToProps & typeof mapDispatchToProps;
interface Props {
    ctr: number;
    storedResults: Array<any>;
    onIncrementCounter: any;
    onDecrementCounter: any;
    onAddCounter: any;
    onSubstractCounter: any;
    onStoreResult: any;
    onDeleteResult: any;
}

class Counter extends Component<Props> {

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
                <CounterControl label="Add 10" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 15" clicked={this.props.onSubstractCounter}  />
                <hr/>
                <button onClick={()=>this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {this.props.storedResults.map((strResult:any) => {
                        return <li key={strResult.id} onClick={() => this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>
                    })}
                    
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state:CounterState) => {
    return {
        ctr: state["ctr"].counter,
        storedResults: state["res"].results
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        onIncrementCounter: () => dispatch(actionCreators.increment()),
        onDecrementCounter : () => dispatch(actionCreators.decrement()),
        onAddCounter : () => dispatch(actionCreators.add(10)),
        onSubstractCounter : () => dispatch(actionCreators.substract(15)),
        onStoreResult: (result:number) => dispatch(actionCreators.storeResult(result)),
        onDeleteResult: (id:number) => dispatch(actionCreators.deleteResult(id)),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Counter);