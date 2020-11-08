import React from 'react';
import Person from './Person/Person';
const persons = (props:any) => {
  console.log('[Persons.js] rendering .....');
  return props.persons.map((person:any, index:number)=>{
  
    return(
          <Person 
            click={()=>props.clicked(index)} 
            name={person.name} 
            age={person.age} 
            changed={(event:any)=>props.changed(event, person.id)}
            key={person.id}
          >
        </Person>            
    );
  });
};
    


export default persons;