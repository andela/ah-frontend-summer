import * as actionTypes from '../actions/actionTypes';
import {getLoggedInUser, SUCCEEDED} from "../actions/async/index";
import {UNDO_BOOKMARK, BOOKMARK} from "../actions/async/ArticleActions";

const initiaState = {
    article: null,
    error: null,
    loading: false,
    message: "",
    averageRating: null
};

const articleReducer = (state = initiaState, action) => {
    if (typeof action === 'undefined'){
        return state;
    }

    switch (action.type) {
    case actionTypes.GET_ARTICLE_START:
        return {
            ...state,
            loading: true,
            error:null,
            article:null,
            message: ""
        };
    case actionTypes.GET_ARTICLE_FAIL:
        return {
            ...state,
            loading: false,
            article: null,
            error: action.error
        };
    case actionTypes.GET_ARTICLE_SUCCESS:
        return {
            ...state,
            loading: false,
            article: action.data.articles,
            error: null,
            averageRating: action.data.articles.average_ratings,
        };
    case actionTypes.DELETE_ARTICLE:
        return {
            ...state,
            loading: false,
            article: action.data.articles,
            error: null
        };
    case actionTypes.CREATE_ARTICLE_SUCCESS:
        return {
            ...state,
            loading: false,
            article: action.data.articles,
            error: null,
            message: "Article created successfully"
        };
    case actionTypes.CREATE_ARTICLE_FAIL:
        return {
            ...state,
            loading: false,
            article: null,
            error: action.error
        };
    case actionTypes.UPDATE_ARTICLE_SUCCESS:
        return {
            ...state,
            loading: false,
            article: action.data.articles,
            error: null,
            message: "Changes saved succefully"
        };
    case actionTypes.UPDATE_ARTICLE_FAIL:
        return {
            ...state,
            loading: false,
            article: null,
            error: action.error
        };
    case actionTypes.ACTION_ENDED:
        return {
            ...state,
            article: null,
            error: null,
            loading: false,
            message: ""
        };

    // bookmark article
    case BOOKMARK + SUCCEEDED: {
        const {favoritesCount, favorited_by: favoritedBy} = state.article;
        return {
            ...state,
            article: {
                ...state.article,
                favoritesCount: favoritesCount + 1,
                favorited_by: [...favoritedBy, getLoggedInUser(localStorage)],
                favorited: true
            }
        };
    }

    case UNDO_BOOKMARK + SUCCEEDED: {
        const {favoritesCount, favorited_by: favoritedBy} = state.article;
        return {
            ...state,
            article: {
                ...state.article,
                favoritesCount: favoritesCount - 1,
                favorited_by: favoritedBy.filter(username => username!==getLoggedInUser(localStorage)),
                favorited: false
            }
        };
    }

    default: return state;
    }
};

export default articleReducer;
