import ResultState from "../states/resultState";
import * as actionTypes from "../actions/actionTypes"
import { updateObject } from "../utility";

const initialState: ResultState = {
    results : []
}

const deleteResult = (state: ResultState, action: actionTypes.DeleteResultAction) => {
    const updatedArray = state.results.filter((result:any) => result.id !== action.resultElId );
    return updateObject(state,{ results: updatedArray });
};

const reducer = (state:ResultState=initialState, action:actionTypes.ActionTypes) => {
    switch (action.type){
        case actionTypes.STORE_RESULT:
            return updateObject(state,{ results: state.results.concat({ id: new Date(),value: action.result }) });
        case actionTypes.DELETE_RESULT:
            return deleteResult(state,action);
        default:
            return state
    }
}

export default reducer;