import { createActionThunk } from 'redux-thunk-actions';

// placeholder action
export const FETCH_HOME_PAGE_ACTION = "FETCH_HOME_PAGE_ACTION";

export const STARTED = "_STARTED";
export const SUCCEEDED = "_SUCCEEDED";
export const FAILED = "_FAILED";
export const ENDED = "_ENDED";


const fetchHomePage = (url) => {
    // hit our home page endpoint
    return fetch(url);
};

// createActionThunk returns a thunk/ function which you can call with the arguments required
// by your method(which may or may not return a promise) and pass the result to dispatch.
// In this case, something like dispatch(fetchHomePageAction('http://ah-backend-summer-staging.herokuapp.com/'))
// It uses redux thunk underneath and will dispatch the appropriate actions when the call returns
export const fetchHomePageAction = createActionThunk(FETCH_HOME_PAGE_ACTION, fetchHomePage);
