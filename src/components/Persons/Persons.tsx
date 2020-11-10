import React,{PureComponent} from 'react';
import Person from './Person/Person';
interface Props {
  persons:any;
  clicked:any;
  changed:any;
  isAuthenticated:boolean;
}

class Persons extends PureComponent<Props>{
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

  
  // shouldComponentUpdate(nextProps:any,nextState:any):any{
  //   console.log('[Persons.tsx] shouldComponentUpdate');
  //   if( nextProps.persons !== this.props.persons || 
  //     nextProps.changed !== this.props.changed || 
  //     nextProps.clicked !== this.props.clicked ){
  //     return true;
  //   }
  //   return false;
  //   // return true;
  // }

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

  componentWillUnmount(){
    console.log('[Persons.tsx] componentWillUnmount');
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
              isAuth = { this.props.isAuthenticated  }
            >
          </Person>            
      );
    });
  };
  
};
    


export default Persons;