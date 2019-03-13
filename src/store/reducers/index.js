import { combineReducers } from 'redux';
import {ENDED, FAILED, FETCH_HOME_PAGE_ACTION, STARTED, SUCCEEDED} from "../actions/async";
import { loginReducer } from "./login";

// place holder reducer. we'll get rid of in the future as the actual reducers are defined
const defaultReducer = (state={}, action) => {
    return state;
};

const demoReducer = (state={status: "succeeded", loading: false}, action) => {
    switch (action.type) {
    case FETCH_HOME_PAGE_ACTION + STARTED:
        return {...state, status: "started", loading: true};
    case FETCH_HOME_PAGE_ACTION + SUCCEEDED:
        return {...state, status: "succeeded"};
    case FETCH_HOME_PAGE_ACTION + FAILED:
        return {...state, status: "failed"};
    case FETCH_HOME_PAGE_ACTION + ENDED:
        return {...state, loading: false};
    default:
        return state;
    }
};

// the parts- each of these will receive a part of the store and are responsible for returning an updated part
// return the store itself if no changes are made
// you can take this even further and split and combine each of these reducers using the same pattern
const reducerParts = {
    articles: defaultReducer,
    article: defaultReducer,
    comments: defaultReducer,
    demo: demoReducer,
    login: loginReducer
};

// we combine the individual parts
const reducer = combineReducers(reducerParts);

// and export only the parent reducer
export default reducer;
