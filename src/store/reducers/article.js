import * as actionTypes from '../actions/actionTypes';

const initiaState = {
    article: null,
    error: null,
    loading: false,
    message: "",
    averageRating: null
};

const articleReducer = (state = initiaState, action) => {
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
                averageRating: action.data.articles.average_ratings
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
        default: return state;
    };
};

export default articleReducer;
