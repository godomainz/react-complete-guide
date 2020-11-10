import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withClass from '../../../hoc/withClass'; 
import Aux from '../../../hoc/Auxilary';
import classes from './Person.module.css';
import AuthContext from '../../../context/auth-context';

interface Props {
    click:any;
    name:string;
    age:number;
    changed:any;
    isAuth:boolean;
}
class Person extends Component<Props>{
    static propTypes = {
        click: PropTypes.func,
        name: PropTypes.string,
        age: PropTypes.number,
        changed: PropTypes.func
    };

    inputElementRef:any;

    constructor(props:any){
        super(props);
        console.log('[Person.tsx] constructor');
        this.inputElementRef = React.createRef<HTMLInputElement>();
      }

    componentDidMount() {
        // this.inputElementRef.focus();
        this.inputElementRef.current.focus();
    }

    render(){
        console.log('[Person.tsx] rendering .....');
        return(
            <Aux>
                <AuthContext.Consumer>
                    {
                        (context) => context.authenticated ? <p>Authenticated</p>:<p>Please Log in</p>
                    }
                </AuthContext.Consumer>
                
                <p onClick={this.props.click}>I'm {this.props.name} and I am {this.props.age} years old</p>
                <p>{this.props.children}</p>
                <input type="text" 
                // ref={(inputEl) => { this.inputElementRef = inputEl }} 
                ref={this.inputElementRef}
                onChange={this.props.changed} value={this.props.name}/>
            </Aux>   
        );  
    }
    
}


export default withClass(Person, classes.Person);