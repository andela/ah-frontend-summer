import {commentsReducer, defaultCommentsState, defaultReplyState, repliesReducer} from "../CommentsReducer";
import {ENDED, FAILED, STARTED, SUCCEEDED} from "../../actions/async";
import {
    FETCH_COMMENTS_ACTION} from "../../actions/actionTypes";
import {
    CREATE_COMMENT_ACTION,
    CREATE_REPLY_ACTION, DELETE_COMMENT_ACTION,
    DELETE_REPLY_ACTION, FETCH_REPLIES_ACTION, UPDATE_COMMENT_ACTION,
    UPDATE_REPLY_ACTION
} from "../../actions/actionTypes";

describe('Comments Reducer Tests', () => {
    it('returns the correct default state', () => {
        expect(commentsReducer()).toEqual(defaultCommentsState);
    });

    it('returns the default state on non supported action', () => {
        expect(commentsReducer({sameState: 2}, {type: "unsupported action"})).toEqual({sameState: 2});
    });

    describe('fetch comments actions', () => {
        it('sets status as started and loading as true on action start', () => {
            expect(commentsReducer({status: SUCCEEDED, loading: false}, {type: FETCH_COMMENTS_ACTION + STARTED})).toEqual({
                status: STARTED,
                loading: true
            });
        });

        it('sets status as succeeded on success action', () => {
            expect(commentsReducer({}, {type: FETCH_COMMENTS_ACTION + SUCCEEDED, payload: {data: {comments: []}}})).toEqual({status: SUCCEEDED, comments: []});
        });

        it('sets status as failed and the correct error message on failed action', () => {
            expect(commentsReducer({}, {type: FETCH_COMMENTS_ACTION + FAILED, payload: {message: "Failed"}})).toEqual({
                status: FAILED, errors: "Failed"
            });
        });

        it('sets loading to false on ended action', () => {
            expect(commentsReducer({}, {type: FETCH_COMMENTS_ACTION + ENDED})).toEqual({loading: false});
        });
    });

    describe('create comment actions', () => {
        it("sets the new comment state's loading to true and status to started on started action", () => {
            expect(commentsReducer({newComment: {status: SUCCEEDED, loading: false}}, {type: CREATE_COMMENT_ACTION + STARTED})).toEqual({
                newComment: {
                    status: STARTED,
                    loading: true
                }
            });
        });

        it("sets the new comment state's status to succeeded and add's new comment to state on success action", () => {
            expect(commentsReducer({newComment: {status: STARTED}, comments: []}, {type: CREATE_COMMENT_ACTION + SUCCEEDED, payload: {
                data: {
                    comment: 1
                }
            }})).toEqual({
                newComment: {
                    status: SUCCEEDED
                },
                comments: [1]
            });
        });

        it('sets the new comment state status to failed and the correct error message on failed action', () => {
            expect(commentsReducer({newComment: {status: STARTED, error: ""}}, {type: CREATE_COMMENT_ACTION + FAILED, payload: {
                message: "Failed"
            }})).toEqual({
                newComment: {
                    status: FAILED,
                    error: "Failed"
                }
            });
        });

        it("sets the new comment state's loading to false on ended action", () => {
            expect(commentsReducer({newComment: {loading: true}}, {type: CREATE_COMMENT_ACTION + ENDED})).toEqual({
                newComment: {
                    loading: false
                }
            });
        });
    });

    describe('update comments actions', () => {
        it('sets comment loading to true and status to started on start action', () => {
            expect(commentsReducer({comments: [{id: 4}]}, {type: UPDATE_COMMENT_ACTION + STARTED, payload: [4]})).toEqual({
                comments: [{
                    id: 4,
                    loading: true,
                    status: STARTED
                }]
            });
        });

        it('sets status to success and loading to false on succeeded action', () => {
            expect(commentsReducer({comments: [{id: 4, body: "old body"}]}, {type: UPDATE_COMMENT_ACTION + SUCCEEDED, payload: {data: {comment: {id: 4, body: "new body"}}}})).toEqual({
                comments: [{
                    id: 4,
                    body: "new body",
                    loading: false,
                    status: SUCCEEDED
                }]
            });
        });
    });

    describe('delete comment action', () => {
        it('sets deleteComments loading to true, status to started and the id of comment being deleted correctly', () => {
            expect(commentsReducer({deleteComment: {loading: false, status: SUCCEEDED, deleting: 0}}, {type: DELETE_COMMENT_ACTION + STARTED, payload: [2]})).toEqual({
                deleteComment: {
                    loading: true,
                    status: STARTED,
                    deleting: 2
                }
            });
        });

        it('sets deleteComments status to succeeded and removed comments from store on succeeded action', () => {
            expect(commentsReducer({comments: [{id: 4, body: "old body"}], deleteComment: {deleting: 4}}, {type: DELETE_COMMENT_ACTION + SUCCEEDED})).toEqual({
                comments: [],
                deleteComment: {
                    status: SUCCEEDED,
                    deleting: 4
                }
            });
        });

        it('sets the delete comment status to failed on failed action', () => {
            expect(commentsReducer({deleteComment: {status: SUCCEEDED}}, {type: DELETE_COMMENT_ACTION + FAILED})).toEqual({
                deleteComment: {
                    status: FAILED
                }
            });
        });

        it('sets the delete comment loading to false on ended action', () => {
            expect(commentsReducer({deleteComment: {loading: true, deleting: 4}}, {type: DELETE_COMMENT_ACTION + ENDED})).toEqual({
                deleteComment: {
                    loading: false,
                    deleting: 0
                }
            });
        });
    });


});

describe('Replies Reducer Tests', () => {
    it('returns the correct default state', () => {
        expect(repliesReducer()).toEqual(defaultReplyState);
    });

    it('returns the same state if action is unrecognized', () => {
        expect(repliesReducer([2], {type: "unrecognized action"})).toEqual([2]);
    });

    describe('replies retrieve tests', () => {
        it('sets a comments reply states loading to true and status to started on started action', () => {
            expect(repliesReducer(defaultReplyState, {type: FETCH_REPLIES_ACTION + STARTED, meta: {
                pk : 2
            }})).toEqual({2: {
                replies: [],
                loading: true,
                status: STARTED,
                error: ""
            }});
        });

        it('sets the status to succeeded and the correct replies on succeeded action', () => {
            expect(repliesReducer({2: {}}, {type: FETCH_REPLIES_ACTION + SUCCEEDED, meta: {pk: 2}, payload: {
                data: {
                    replies: [2,3]
                }
            }})).toEqual({
                2: {replies: [2,3], status: SUCCEEDED}
            });
        });

        it('sets the status to failed on failed action', ()  => {
            expect(repliesReducer({2: {}}, {type: FETCH_REPLIES_ACTION + FAILED, meta: {pk: 2}})).toEqual({
                2: {status: FAILED}
            });
        });

        it('sets loading to false on ended action', () => {
            expect(repliesReducer({2: {}}, {type: FETCH_REPLIES_ACTION + ENDED, meta: {pk: 2}})).toEqual({
                2: {loading: false}
            });
        });
    });

    describe('create reply actions', () => {
        it('sets loading to true and status to started on the newComment state', () => {
            expect(repliesReducer({2: {}}, {type: CREATE_REPLY_ACTION + STARTED, payload: [2]})).toEqual({
                2: {newReply: {
                    loading: true,
                    status: STARTED,
                    error: ""
                }}
            });
        });

        it('sets loading to false and status to succeeded on success action', () => {
            expect(repliesReducer({2: {newReply: {}, replies: []}}, {type: CREATE_REPLY_ACTION + SUCCEEDED, payload: {data: {reply: {comment: 2, body: "body"}}}})).toEqual({
                2: {
                    newReply: {
                        loading: false,
                        status: SUCCEEDED,
                    },
                    replies: [{
                        comment: 2,
                        body: "body"
                    }]
                }
            });
        });
    });

    describe('update reply actions', () => {
        it('sets loading to true and status to started on started action', () => {
            expect(repliesReducer({2: {replies: [{id: 3}]}}, {type: UPDATE_REPLY_ACTION + STARTED, payload: [3, 2]})).toEqual({
                2: {
                    replies: [
                        {
                            loading: true,
                            status: STARTED,
                            id: 3
                        }
                    ]
                }
            });
        });

        it('sets loading to false and status to succeeded on success action', () => {
            expect(repliesReducer({2: {replies: [{id: 3}]}}, {type: UPDATE_REPLY_ACTION + SUCCEEDED, payload: {data: {reply: {id: 3, body: "body", comment: 2}}}})).toEqual({
                2: {
                    replies: [
                        {
                            loading: false,
                            status: SUCCEEDED,
                            id: 3,
                            comment: 2,
                            body: "body"
                        }
                    ]
                }
            });
        });
    });

    describe('delete reply actions', () => {
        it('sets the delete reply state to loading and status to started on start action', () => {
            expect(repliesReducer({2: {}}, {type: DELETE_REPLY_ACTION + STARTED, meta: {pk: 3, commentPk: 2}})).toEqual({
                2: {
                    deleteReply: {
                        loading: true,
                        status: STARTED,
                        error: ""
                    }}
            });
        });

        it('removes the previous reply from the list and sets the delete reply status to succeeded on success action', () => {
            expect(repliesReducer({2: {replies: [{id: 3}], deleteReply: {}}}, {type: DELETE_REPLY_ACTION + SUCCEEDED, meta: {pk: 3, commentPk: 2}})).toEqual({
                2: {
                    deleteReply: {
                        status: SUCCEEDED,
                    },
                    replies: []
                }
            });
        });

        it('sets the status to failed and correct error message on failed action', () => {
            expect(repliesReducer({2: {deleteReply: {}}}, {type: DELETE_REPLY_ACTION + FAILED, payload: {message: "error"}, meta: {pk: 3, commentPk: 2}})).toEqual({
                2: {
                    deleteReply: {
                        status: FAILED,
                        error: "error"
                    }}
            });
        });

        it('sets loading to false on ended action', () => {
            expect(repliesReducer({2: {deleteReply: {}}}, {type: DELETE_REPLY_ACTION + ENDED, meta: {pk: 3, commentPk: 2}})).toEqual({
                2: {
                    deleteReply: {
                        loading: false
                    }}
            });
        });
    });
});
