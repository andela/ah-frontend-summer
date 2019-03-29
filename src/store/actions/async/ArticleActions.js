import axios from 'axios';
import { createActionThunk } from 'redux-thunk-actions';
import {get_axios_config, URL} from "./index";


export const FETCH_ARTICLES_ACTION = "FETCH_ARTICLES_ACTION";
export const BOOKMARK = "BOOKMARK";
export const UNDO_BOOKMARK = "UNDO_BOOKMARK";

const fetchArticles = url => {
    return axios.get(url);
};

const bookmarkArticle = (slug) => {
    return axios.post(`${URL}/articles/${slug}/favorite`, {}, get_axios_config());
};

const undoBookmark = (slug) => {
    return axios.delete(`${URL}/articles/${slug}/unfavorite`, get_axios_config());
};

export const fetchArticlesAction = createActionThunk(FETCH_ARTICLES_ACTION, fetchArticles, true);
export const bookmarkAction = createActionThunk(BOOKMARK, bookmarkArticle, true);
export const undoBookmarkAction = createActionThunk(UNDO_BOOKMARK, undoBookmark, true);
