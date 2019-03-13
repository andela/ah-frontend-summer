import Axios from 'axios';
import { createActionThunk } from 'redux-thunk-actions';


export const FETCH_ARTICLES_ACTION = "FETCH_ARTICLES_ACTION";


const fetchArticles = () => {
    return Axios.get('http://ah-backend-summer-staging.herokuapp.com/api/v1/articles');

};

export const fetchArticlesAction = createActionThunk(FETCH_ARTICLES_ACTION, fetchArticles);
