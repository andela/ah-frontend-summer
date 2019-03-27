import axios from 'axios';
import {createActionThunk} from 'redux-thunk-actions';
import {
    ENDED,
    FAILED,
    get_axios_config,
    STARTED,
    SUCCEEDED,
    URL
} from "./index";
import {
    CREATE_COMMENT_ACTION,
    CREATE_REPLY_ACTION,
    DELETE_COMMENT_ACTION,
    DELETE_REPLY_ACTION,
    FETCH_COMMENTS_ACTION,
    FETCH_REPLIES_ACTION,
    UPDATE_COMMENT_ACTION,
    UPDATE_REPLY_ACTION
} from "../actionTypes";

const fetchComments = (slug) => {
    if(localStorage.getItem("token")){
        return axios.get(`${URL}/articles/${slug}/comments`, get_axios_config());
    }else{
        return axios.get(`${URL}/articles/${slug}/comments`);
    }
};

const createComment = (slug, body) => {
    return axios.post(`${URL}/articles/${slug}/comments`, {body}, get_axios_config());
};

const updateComment = (pk, body) => {
    return axios.patch(`${URL}/articles/comments/${pk}`, {body}, get_axios_config());
};

const deleteComment = (pk) => {
    return axios.delete(`${URL}/articles/comments/${pk}`, get_axios_config());
};

// reply api calls
const fetchReplies = (pk) => {
    return axios.get(`${URL}/articles/comments/${pk}/replies`);
};

const createReply = (pk, body) => {
    return axios.post(`${URL}/articles/comments/${pk}/replies`, {body}, get_axios_config());
};

const updateReply = (pk, commentPk, body) => {
    return axios.patch(`${URL}/articles/comments/replies/${pk}`, {body}, get_axios_config());
};

const deleteReply = (pk) => {
    return axios.delete(`${URL}/articles/comments/replies/${pk}`, get_axios_config());
};


// comment actions
export const fetchCommentsAction = createActionThunk(FETCH_COMMENTS_ACTION, fetchComments, true);

export const createCommentAction = createActionThunk(CREATE_COMMENT_ACTION, createComment, true);

export const updateCommentAction = createActionThunk(UPDATE_COMMENT_ACTION, updateComment, true);

export const deleteCommentAction = createActionThunk(DELETE_COMMENT_ACTION, deleteComment, true);

// reply actions
export const fetchRepliesAction = (pk) => {
    return (dispatch) => {
        dispatch({
            type: FETCH_REPLIES_ACTION + STARTED,
            meta: {
                pk
            }
        });
        fetchReplies(pk).then((data) => {
            dispatch({
                type: FETCH_REPLIES_ACTION + SUCCEEDED,
                payload: data,
                meta: {
                    pk
                }
            });
            dispatch({
                type: FETCH_REPLIES_ACTION + ENDED,
                meta: {
                    pk
                }
            });
        }).catch((e) => {
            dispatch({
                type: FETCH_REPLIES_ACTION + FAILED,
                payload: {
                    message: e
                },
                meta: {
                    pk
                }
            });
            dispatch({
                type: FETCH_REPLIES_ACTION + ENDED,
                meta: {
                    pk
                }
            });
        });
    };
};

export const createReplyAction = createActionThunk(CREATE_REPLY_ACTION, createReply, true);

export const updateReplyAction = createActionThunk(UPDATE_REPLY_ACTION, updateReply, true);

export const deleteReplyAction = (pk, commentPk) => {
    return (dispatch) => {
        dispatch({
            type: DELETE_REPLY_ACTION + STARTED,
            meta: {
                pk,
                commentPk
            }
        });

        deleteReply(pk).then((data) => {
            dispatch({
                type: DELETE_REPLY_ACTION + SUCCEEDED,
                payload: data,
                meta: {
                    pk,
                    commentPk
                }
            });
            dispatch({
                type: DELETE_REPLY_ACTION + ENDED,
                meta: {
                    pk,
                    commentPk
                }
            });
        }).catch((e) => {
            dispatch({
                type: DELETE_REPLY_ACTION + FAILED,
                payload: {
                    message: e
                },
                meta: {
                    pk,
                    commentPk
                }
            });
            dispatch({
                type: DELETE_REPLY_ACTION + ENDED,
                meta: {
                    pk,
                    commentPk
                }
            });
        });
    };
};
