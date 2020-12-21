export const ADD_PERSON = "ADD_PERSON";
export const DELETE_PERSON = "DELETE_PERSON";

export type AddPersonAction = {type: typeof ADD_PERSON}
export type DeletePersonAction = {type: typeof DELETE_PERSON, id:number}

export const addPerson = ():AddPersonAction => ({
    type: ADD_PERSON
});

export const deletePerson = (id:number):DeletePersonAction => ({
    type: DELETE_PERSON,
    id:id
});

export type ActionTypes = AddPersonAction | DeletePersonAction ;