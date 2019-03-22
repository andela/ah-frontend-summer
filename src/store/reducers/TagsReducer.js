import { FETCH_TAGS_ACTION } from '../actions/actionTypes';
import {ENDED, FAILED, STARTED, SUCCEEDED} from "../actions/async";

export const defaultState ={
    tags: [],
    status: "succeeded",
    errors: ""
};

const tagsReducer = (state=defaultState, action) => {
    if (typeof action === "undefined"){
        return state;
    }

    switch(action.type){
    case FETCH_TAGS_ACTION + STARTED:
        return {
            ...state,
            status: STARTED,
        };
    case FETCH_TAGS_ACTION + SUCCEEDED:
        return {
            ...state,
            status: SUCCEEDED,
            tags: action.payload.data.tags
        };
    case FETCH_TAGS_ACTION + FAILED:
        return {
            ...state,
            status: FAILED,
            errors: action.payload.data.message
        };
    case FETCH_TAGS_ACTION + ENDED:
        return {
            ...state
        };
    default:
        return state;
    }
};

export default tagsReducer;
