import React, { Component } from 'react';
import classes from  './App.module.css';
import Persons from '../components/Persons/Persons';
import Cockpit from  '../components/Cockpit/Cockpit';
interface Props {
  appTitle: string;

}
class App extends Component<Props> {

  constructor(props:any){
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [{id:1, name:"Max", age:28},{id:2, name:"Manu", age:29},{id:3, name:"Stephanie", age:26}],
    otherState:"Some Otherstate",
    showPersons:false
  }

  static getDerivedStateFromProps(props:any,state:any){
    console.log('[App.js] getDerivedStateFromProps ',props);
    return state;
  }

 
  nameChangedHandler = (event:any,id:number) =>{
    const personIndex = this.state.persons.findIndex(p =>
      {
        return p.id === id;
      });

    const person = {...this.state.persons[personIndex]};
    person.name  = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;
    

    this.setState({persons: persons});
  }

  deletePersonHandler = (personIndex:number)=>{
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons: persons});
  }

  togglePersonHandler = ()=>{
    const doesShow = this.state.showPersons;
    this.setState({showPersons:!doesShow})
  }

  // UNSAFE_componentWillMount(nextProps){
  //   console.log('[App.js] componentWillMount ',nextProps);
  //   console.log('[App.js] componentWillMount ');
  // }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }
  render() {
    console.log('[App.js] render');
    let persons = null;

    if(this.state.showPersons){
      persons = <Persons persons={this.state.persons} clicked={this.deletePersonHandler} changed={this.nameChangedHandler}></Persons> ;
    }

    
    
    return (
        <div className={classes.App}>
            <Cockpit title={this.props.appTitle} showPersons={this.state.showPersons} persons={this.state.persons} clicked={this.togglePersonHandler}></Cockpit>
            {persons }
        </div>

    );
    // return React.createElement('div',{className:'App'},React.createElement('h1',null,"Does this work now ?"));
  }
}

export default App;