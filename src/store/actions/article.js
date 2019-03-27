import axios from "axios";

import * as actionTypes from "./actionTypes";

const url = "https://ah-backend-summer-staging.herokuapp.com/api/v1/articles/";

export const articleActionStart = () => {
    return { type: actionTypes.GET_ARTICLE_START };
};

export const getArticleFail = (error) => {
    return { type: actionTypes.GET_ARTICLE_FAIL, error };
};

export const getArticleSuccess = (data) => {
    return {
        type: actionTypes.GET_ARTICLE_SUCCESS,
        data
    };
};

export const deleteArticleAction = (data) => {
    return {
        type: actionTypes.DELETE_ARTICLE,
        data
    };
};

export const deleteArticleFail = (error) => {
    return {
        type: actionTypes.DELETE_ARTICLE_FAIL,
        error
    };
};

export const actionFinised = () => {
    return {
        type: actionTypes.ACTION_ENDED
    };
};

export const deleteArticle = (slug) => {
    return async dispatch => {
        dispatch(articleActionStart());
        let token = localStorage.getItem("token");
        try {
            const response = await axios.delete(`${url}` + slug, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(deleteArticleAction(response.data));
            dispatch(actionFinised());
        } catch (error) {
            dispatch(deleteArticleFail(error.response.data));
        }
    };
};

export const getArticle = (slug) => {
    return async (dispatch) => {
        dispatch(articleActionStart());
        try {
            const response = await axios.get(`${url}${slug}`);
            dispatch(getArticleSuccess(response.data));
        } catch (error) {
            dispatch(getArticleFail(error.response.data));
            dispatch(actionFinised());
        }
    };
};

export const createArticleSuccess = (data) => {
    return {
        type: actionTypes.CREATE_ARTICLE_SUCCESS,
        data
    };
};

export const createArticleFail = (error) => {
    return {
        type: actionTypes.CREATE_ARTICLE_FAIL,
        error
    };
};

export const createArticle = (data) => {
    return async dispatch => {
        let token = localStorage.getItem("token");
        let config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        };
        dispatch(articleActionStart())
        try {
            const response = await axios.post(`${url}`, data, config);
            dispatch(createArticleSuccess(response.data));
            dispatch(actionFinised());
        } catch (error) {
            dispatch(createArticleFail(error.response.data));
        }
    }
}

export const updateArticleSuccess = (data) => {
    return {
        type: actionTypes.UPDATE_ARTICLE_SUCCESS,
        data
    };
};

export const updateArticleFail = (error) => {
    return {
        type: actionTypes.UPDATE_ARTICLE_FAIL,
        error
    };
};

export const updateArticle = (slug, data) => {
    return async dispatch => {
        let token = localStorage.getItem("token");
        let config = { headers: { "Authorization": `Bearer ${token}` } };
        dispatch(articleActionStart());
        try {
            const response = await axios.patch(`${url}${slug}`, data, config);
            dispatch(updateArticleSuccess(response.data));
        } catch (error) {
            dispatch(updateArticleFail(error.response.data));
        }
    };
};
