import { FETCH_ARTICLES_ACTION } from "../actions/async/ArticleActions";
import {ENDED, FAILED, STARTED, SUCCEEDED} from "../actions/async";

const articlesReducer = (state={
    articles : [],
    status: "succeeded",
    loading: false,
    errors: ""
}, action) => {

    switch(action.type){
    case FETCH_ARTICLES_ACTION + STARTED:
        return {...state, status: "started", loading: true};
    case FETCH_ARTICLES_ACTION + SUCCEEDED:
        return {...state, status: "succeeded",
            articles: action.payload.data.articles.results};
    case FETCH_ARTICLES_ACTION + FAILED:
        return {...state, status: "failed", errors: action.payload.data};
    case FETCH_ARTICLES_ACTION + ENDED:
        return {...state, loading: false};
    default:
        return state;
    }
}
export default articlesReducer