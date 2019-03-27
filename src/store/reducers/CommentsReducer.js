import {ENDED, FAILED, STARTED, SUCCEEDED} from "../actions/async";
import {
    CREATE_COMMENT_ACTION, CREATE_REPLY_ACTION,
    DELETE_COMMENT_ACTION, DELETE_REPLY_ACTION,
    FETCH_COMMENTS_ACTION, FETCH_REPLIES_ACTION,
    UPDATE_COMMENT_ACTION, UPDATE_REPLY_ACTION
} from "../actions/actionTypes";

export const defaultCommentsState = {
    comments: [],
    status: SUCCEEDED,
    loading: false,
    errors: "",
    newComment: {
        loading: false,
        status: STARTED,
        error: ""
    },
    deleteComment: {
        loading: false,
        deleting: 0,
        status: STARTED,
        error: ""
    }
};

export const defaultReplyState = {};

export const defaultSingleCommentsReplyState = {
    replies: [],
    loading: false,
    status: SUCCEEDED,
    error: ""
};

export const commentsReducer = (state = defaultCommentsState, action) => {
    if (typeof action === 'undefined') {
        return state;
    }

    // this is not the most efficient way of cloning the state.
    // It is however concise, easy to conceptualize and is perfect for us since we;
    // 1. might have multiple levels of (non recursive) nested objects
    // 2. are dealing with primitives
    const newState = JSON.parse(JSON.stringify(state));

    // fetch comments
    switch (action.type) {
    case FETCH_COMMENTS_ACTION + STARTED:
        return {...state, status: STARTED, loading: true};
    case FETCH_COMMENTS_ACTION + SUCCEEDED:
        return {
            ...state, status: SUCCEEDED,
            comments: action.payload.data.comments
        };
    case FETCH_COMMENTS_ACTION + FAILED:
        return {...state, status: FAILED, errors: action.payload.message};
    case FETCH_COMMENTS_ACTION + ENDED:
        return {...state, loading: false};

        // create comment
    case CREATE_COMMENT_ACTION + STARTED: {
        newState.newComment.status = STARTED;
        newState.newComment.loading = true;
        return newState;
    }
    case CREATE_COMMENT_ACTION + SUCCEEDED: {
        newState.newComment.status = SUCCEEDED;
        newState.comments.splice(0, 0, action.payload.data.comment);
        return newState;
    }
    case CREATE_COMMENT_ACTION + FAILED: {
        newState.newComment.status = FAILED;
        newState.newComment.error = action.payload.message;
        return newState;
    }
    case CREATE_COMMENT_ACTION + ENDED: {
        newState.newComment.loading = false;
        return newState;
    }

    // update comment
    case UPDATE_COMMENT_ACTION + STARTED: {
        const comment = newState.comments.filter((comment) => {
            return comment.id === action.payload[0];
        })[0];
        comment.loading = true;
        comment.status = STARTED;
        return newState;
    }
    case UPDATE_COMMENT_ACTION + SUCCEEDED: {
        const newComment = action.payload.data.comment;
        let oldComment = newState.comments.filter(oldComment => {
            return oldComment.id === newComment.id;
        })[0];
        newComment['loading'] = false;
        newComment['status'] = SUCCEEDED;
        newState.comments[newState.comments.indexOf(oldComment)] = newComment;
        return newState;
    }

    //delete comment
    case DELETE_COMMENT_ACTION + STARTED: {
        newState.deleteComment.loading = true;
        newState.deleteComment.status = STARTED;
        newState.deleteComment.deleting = action.payload[0];
        return newState;
    }
    case DELETE_COMMENT_ACTION + SUCCEEDED: {
        newState.deleteComment.status = SUCCEEDED;
        let oldComment = newState.comments.filter(oldComment => {
            return oldComment.id === newState.deleteComment.deleting;
        })[0];
        newState.comments.splice(newState.comments.indexOf(oldComment), 1);
        newState.deleteComment.status = SUCCEEDED;
        return newState;
    }
    case DELETE_COMMENT_ACTION + FAILED: {
        newState.deleteComment.status = FAILED;
        return newState;
    }
    case DELETE_COMMENT_ACTION + ENDED: {
        newState.deleteComment.loading = false;
        newState.deleteComment.deleting = 0;
        return newState;
    }
    default:
        return state;
    }
};

export const repliesReducer = (state = defaultReplyState, action) => {
    if (typeof action === 'undefined') {
        return state;
    }

    // refer to above note about this approach
    const newState = JSON.parse(JSON.stringify(state));

    switch (action.type) {
    // retrieve replies
    case FETCH_REPLIES_ACTION + STARTED: {
        newState[action.meta.pk] = {
            ...defaultSingleCommentsReplyState,
            status: STARTED,
            loading: true
        };
        return newState;
    }
    case FETCH_REPLIES_ACTION + SUCCEEDED: {
        newState[action.meta.pk] = {
            ...state[action.meta.pk],
            status: SUCCEEDED,
            replies: action.payload.data.replies
        };
        return newState;
    }
    case FETCH_REPLIES_ACTION + FAILED: {
        newState[action.meta.pk] = {...state[action.meta.pk], status: FAILED};
        return newState;
    }
    case FETCH_REPLIES_ACTION + ENDED: {
        newState[action.meta.pk] = {...state[action.meta.pk], loading: false};
        return newState;
    }

    // create replies
    case CREATE_REPLY_ACTION + STARTED: {
        const commentIndex = action.payload[0];
        newState[commentIndex] = {
            ...newState[commentIndex], newReply: {
                loading: false,
                status: STARTED,
                error: ""
            }
        };
        const newReply = newState[commentIndex].newReply;
        newReply.loading = true;
        newReply.status = STARTED;
        return newState;
    }
    case CREATE_REPLY_ACTION + SUCCEEDED: {
        const commentIndex = action.payload.data.reply.comment;
        const newReply = newState[commentIndex].newReply;
        newReply.status = SUCCEEDED;
        newReply.loading = false;
        newState[commentIndex].replies.splice(0, 0, action.payload.data.reply);
        return newState;
    }

    // update reply
    case UPDATE_REPLY_ACTION + STARTED: {
        const commentPk = action.payload[1];
        const pk = action.payload[0];
        let reply = newState[commentPk].replies.filter((reply) => {
            return reply.id === pk;
        })[0];
        const indexOfReply = newState[commentPk].replies.indexOf(reply);
        newState[commentPk].replies[indexOfReply] = {
            ...reply,
            loading: true,
            status: STARTED
        };
        return newState;
    }

    case UPDATE_REPLY_ACTION + SUCCEEDED: {
        const commentPk = action.payload.data.reply.comment;
        const pk = action.payload.data.reply.id;
        let reply = newState[commentPk].replies.filter((reply) => {
            return reply.id === pk;
        })[0];
        const indexOfReply = newState[commentPk].replies.indexOf(reply);
        newState[commentPk].replies[indexOfReply] = {
            ...reply, ...action.payload.data.reply,
            loading: false,
            status: SUCCEEDED
        };
        return newState;
    }

    //delete reply
    case DELETE_REPLY_ACTION + STARTED: {
        const commentIndex = action.meta.commentPk;
        newState[commentIndex] = {
            ...newState[commentIndex], deleteReply: {
                loading: false,
                status: STARTED,
                error: ""
            }
        };
        const deleteReply = newState[commentIndex].deleteReply;
        deleteReply.loading = true;
        return newState;
    }
    case DELETE_REPLY_ACTION + SUCCEEDED: {
        const deletedReplyPk = action.meta.pk;
        const deletedReplyCommentPk = action.meta.commentPk;
        const deleteReply = newState[action.meta.commentPk].deleteReply;
        let oldReply = newState[deletedReplyCommentPk].replies.filter(oldReply => {
            return oldReply.id === deletedReplyPk;
        })[0];
        newState[deletedReplyCommentPk].replies.splice(newState[deletedReplyCommentPk].replies.indexOf(oldReply), 1);
        deleteReply.status = SUCCEEDED;
        return newState;
    }
    case DELETE_REPLY_ACTION + FAILED: {
        const deleteReply = newState[action.meta.commentPk].deleteReply;
        deleteReply.status = FAILED;
        deleteReply.error = action.payload.message;
        return newState;
    }
    case DELETE_REPLY_ACTION + ENDED: {
        const commentIndex = action.meta.commentPk;
        const deleteReply = newState[commentIndex].deleteReply;
        deleteReply.loading = false;
        return newState;
    }

    default:
        return state;
    }
};
