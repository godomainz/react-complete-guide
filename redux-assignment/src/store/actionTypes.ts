export const ADD_PERSON = "ADD_PERSON";
export const DELETE_PERSON = "DELETE_PERSON";

// export type AddPersonAction = {type: typeof ADD_PERSON}
export type AddPersonAction = {type: typeof ADD_PERSON, name:string,age:number}
export type DeletePersonAction = {type: typeof DELETE_PERSON, id:number}

// export const addPerson = ():AddPersonAction => ({
//     type: ADD_PERSON
// });
export const addPerson = (name:string,age:number):AddPersonAction => ({
    type: ADD_PERSON,
        name: name,
        age: age

});

export const deletePerson = (id:number):DeletePersonAction => ({
    type: DELETE_PERSON,
    id:id
});

export type ActionTypes = AddPersonAction | DeletePersonAction ;