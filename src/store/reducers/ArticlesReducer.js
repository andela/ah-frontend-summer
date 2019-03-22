import { FETCH_ARTICLES_ACTION } from "../actions/async/ArticleActions";
import { FETCH_TAG_FILTER_ACTION } from '../actions/actionTypes';
import {ENDED, FAILED, STARTED, SUCCEEDED} from "../actions/async";

export const defaultState = {
    articles : [],
    articleCount: null,
    nextPage: null,
    prevPage: null,
    status: SUCCEEDED,
    loading: false,
    errors: ""
};

const articlesReducer = (state=defaultState, action) => {
    if (typeof action === 'undefined'){
        return state;
    }

    switch(action.type){
    case FETCH_ARTICLES_ACTION + STARTED:
        return {...state, status: STARTED, loading: true};
    case FETCH_ARTICLES_ACTION + SUCCEEDED:
        return {...state, status: SUCCEEDED,
            articles: action.payload.data.articles.results,
            articleCount: action.payload.data.articles.count,
            nextPage: action.payload.data.articles.next,
            prevPage: action.payload.data.articles.previous};
    case FETCH_ARTICLES_ACTION + FAILED:
        return {...state, status: FAILED, errors: action.payload.message};
    case FETCH_ARTICLES_ACTION + ENDED:
        return {...state, loading: false};

    case FETCH_TAG_FILTER_ACTION + STARTED:
        return {...state, status: STARTED, loading: true};
    case FETCH_TAG_FILTER_ACTION + SUCCEEDED:
        return {...state, status: SUCCEEDED,
            loading: false,
            articles: action.payload.data.articles.results,
            articleCount: action.payload.data.articles.count,
            nextPage: action.payload.data.articles.next,
            prevPage: action.payload.data.articles.previous};
    case FETCH_TAG_FILTER_ACTION + FAILED:
        return {...state, status: FAILED, errors: action.payload.message};
    case FETCH_TAG_FILTER_ACTION + ENDED:
        return {...state};
    default:
        return state;
    }
};
export default articlesReducer;
