import React, {Component, Fragment} from 'react';
// import Aux from '../../../hoc/Auxilary';
// import classes from './Person.module.css';
interface Props {
    click:any;
    name:string;
    age:number;
    changed:any;
}
class Person extends Component<Props>{
    constructor(props:any){
        super(props);
        console.log('[Person.tsx] constructor');
      }

    render(){
        console.log('[Person.tsx] rendering .....');
        return(
            <Fragment>
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.changed} value={this.props.name}/>
            </Fragment>   
        );  
    }
    
}

export default Person;