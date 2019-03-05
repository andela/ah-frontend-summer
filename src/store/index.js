import {applyMiddleware, createStore} from 'redux';
import thunk from "redux-thunk";
import reducer from "./reducers";

// we create the app's data store
const store = createStore(
    reducer, // , pass in the main reducer
    applyMiddleware(thunk) // , apply any middleware we are making use of
);

// and export it for the main file to provide it it to the root component
export default store;
