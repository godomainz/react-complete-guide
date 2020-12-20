export const INCREMENT = "INCREMENT";
export type IncrementAction = {type: typeof INCREMENT}

export const increment = ():IncrementAction => ({
    type: INCREMENT
});

export type ActionTypes = IncrementAction;