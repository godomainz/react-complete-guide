import React,{Component} from 'react';
import Person from './Person/Person';
interface Props {
  persons:any;
  clicked:any;
  changed:any;
}

class Persons extends Component<Props>{
  constructor(props:any){
    super(props);
    console.log('[Persons.tsx] constructor');
  }

  // static getDerivedStateFromProps(props:any,state:any){
  //   console.log('[Persons.tsx] getDerivedStateFromProps ',props);
  //   return state;
  // }

  // componentWillReceiveProps(props:any){
  //   console.log('[Persons.tsx] componentWillReceiveProps ',props);
  // }

  
  shouldComponentUpdate(nextProps:any,nextState:any):any{
    console.log('[Persons.tsx] shouldComponentUpdate');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps:any,prevState:any){
    console.log('[Persons.tsx] getSnapshotBeforeUpdate');
    return {message:'Snapshot'};
  }

  // componentWillUpdate(nextProps:any){
  //   console.log('[Persons.tsx] shouldComponentUpdate');
  // }

  componentDidUpdate(prevProps:any, prevState:any, snapshot:any){
    console.log('[Persons.tsx] componentDidUpdate');
    console.log('Snapshot ',snapshot);
  }

  render(){
    console.log('[Persons.js] rendering .....');
    return this.props.persons.map((person:any, index:number)=>{
    
      return(
            <Person 
              click={()=>this.props.clicked(index)} 
              name={person.name} 
              age={person.age} 
              changed={(event:any)=>this.props.changed(event, person.id)}
              key={person.id}
            >
          </Person>            
      );
    });
  };
  
};
    


export default Persons;