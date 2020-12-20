export const INC_COUNTER = "INC_COUNTER";
export const ADD_COUNTER = "ADD_COUNTER";

type IncCounterAction = {type: typeof INC_COUNTER, value?: number}
type AddCounterAction = {type: typeof ADD_COUNTER, value?: number}

export const incCounter = ():IncCounterAction => ({
    type: INC_COUNTER
});
export const addCounter = ():AddCounterAction => ({
    type: ADD_COUNTER
});


export type ActionTypes = IncCounterAction | AddCounterAction;