import ResultState from "../states/resultState";
import * as actionTypes from "../actions/actionTypes"

const initialState: ResultState = {
    results : []
}

const reducer = (state:ResultState=initialState, action:actionTypes.ActionTypes) => {
    switch (action.type){
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({id: new Date(),value: action.result})
            }
        case actionTypes.DELETE_RESULT:
            // const id = 2;
            // const newArray = [...state.results];
            // newArray.splice(id, 1);
            const updatedArray = state.results.filter((result:any) => result.id !== action.resultElId );
            return {
                ...state,
                results: updatedArray
            }
        default:
            return state
    }
}

export default reducer;