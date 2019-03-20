import axios from 'axios';
import { createActionThunk } from 'redux-thunk-actions';


export const FETCH_ARTICLES_ACTION = "FETCH_ARTICLES_ACTION";

const fetchArticles = url => {
    return axios.get(url);
};

export const fetchArticlesAction = createActionThunk(FETCH_ARTICLES_ACTION, fetchArticles, true);
