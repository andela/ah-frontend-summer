import { combineReducers } from 'redux';

import navBarReducer from './navBarReducer';
import authReducer from './auth';

// the parts- each of these will receive a part of the store and are responsible for returning an updated part
// return the store itself if no changes are made
// you can take this even further and split and combine each of these reducers using the same pattern
const reducerParts = {
    navBar: navBarReducer,
    auth: authReducer
};

// we combine the individual parts
const reducer = combineReducers(reducerParts);

// and export only the parent reducer
export default reducer;
