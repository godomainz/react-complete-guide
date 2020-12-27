import ResultState from "../states/resultState";
import * as actionTypes from "../actions/actionTypes"
import { updatedObject } from "../utility";

const initialState: ResultState = {
    results : []
}

const reducer = (state:ResultState=initialState, action:actionTypes.ActionTypes) => {
    switch (action.type){
        case actionTypes.STORE_RESULT:
            return updatedObject(state,{ results: state.results.concat({ id: new Date(),value: action.result }) });
        case actionTypes.DELETE_RESULT:
            const updatedArray = state.results.filter((result:any) => result.id !== action.resultElId );
            return updatedObject(state,{ results: updatedArray });
        default:
            return state
    }
}

export default reducer;