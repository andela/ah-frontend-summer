import { combineReducers } from 'redux';
import loginReducer from "./login";

import navBarReducer from './navBarReducer';
import authReducer from './auth';
import articlesReducer from "./ArticlesReducer";

// the parts- each of these will receive a part of the store and are responsible for returning an updated part
// return the store itself if no changes are made
// you can take this even further and split and combine each of these reducers using the same pattern
const reducerParts = {
    navBar: navBarReducer,
    auth: authReducer,
    articles: articlesReducer,
    login: loginReducer
};

// we combine the individual parts
const reducer = combineReducers(reducerParts);

// and export only the parent reducer
export default reducer;
