import { combineReducers } from 'redux';
import loginReducer from "./login";
import navBarReducer from './navBarReducer';
import authReducer from './auth';
import articlesReducer from "./ArticlesReducer";
import articleReducer from './article';
import {commentsReducer,repliesReducer} from "./CommentsReducer";
import rateReducer from './rate';
import passwordResetReducer from './passwordResetReducer';
import profileReducer from './profiles';
import tagsReducer from './TagsReducer';
import ReportArticleReducer from './ReportArticleReducer';

// the parts- each of these will receive a part of the store and are responsible for returning an updated part
// return the store itself if no changes are made
// you can take this even further and split and combine each of these reducers using the same pattern
const reducerParts = {
    navBar: navBarReducer,
    auth: authReducer,
    articles: articlesReducer,
    login: loginReducer,
    article: articleReducer,
    comments: commentsReducer,
    replies: repliesReducer,
    rate: rateReducer,
    passwordReset: passwordResetReducer,
    profile: profileReducer,
    tags: tagsReducer,
    reportArticle: ReportArticleReducer
};

// we combine the individual parts
const reducer = combineReducers(reducerParts);

// and export only the parent reducer
export default reducer;
