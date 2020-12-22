import React, { Component } from 'react';
import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import {connect} from "react-redux";
import * as actionTypes from "../store/actionTypes";


interface Props {
    addPerson: any;
    deletePerson: any;
}

class Persons extends Component<Props> {
    state:any = {
        persons: []
    }

    personDeletedHandler = (personId:number) => {
        this.setState( ( prevState ) => {
            return { persons: prevState["persons"].filter((person:any) => person.id !== personId)}
        } );
    }

    render () {
        return (
            <div>
                <AddPerson personAdded={(name:string,age:number)=>this.props.addPerson(name,age)} />
                {this.props["persons"].map((person:any) => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={() => this.props.deletePerson(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state:any) => {
    return {
        persons: state.persons
    }
}

const mapDispatchToProps = (dispatch:any) => {
    return {
        addPerson: (name:string,age:number) => dispatch(actionTypes.addPerson(name,age)),
        deletePerson : (id:number) => dispatch(actionTypes.deletePerson(id))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Persons);