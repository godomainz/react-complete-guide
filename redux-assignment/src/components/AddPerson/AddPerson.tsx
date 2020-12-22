import React, { Component } from "react";
import classes from './AddPerson.module.css';

interface Props {
    personAdded: any;
}

class AddPerson extends Component<Props> {

    state = {
        name: "",
        age: 0
    }

    nameChangedHandler = (event:any) => {
        this.setState({name: event.target.value})
    }

    ageChangedHandler = (event:any) => {
        this.setState({age: event.target.value})
    }

    render(){
        console.log(this.state)
        return (
            <div className={classes.AddPerson}>
                <input type="text" placeholder="Name" onChange={this.nameChangedHandler} value={this.state.name}/>
                <input type="number" placeholder="Age" onChange={this.ageChangedHandler} value={this.state.age}/>
                <button onClick={()=> this.props.personAdded(this.state.name,this.state.age)}>Add Person</button>
            </div>
        )
    }
    
}

export default AddPerson;