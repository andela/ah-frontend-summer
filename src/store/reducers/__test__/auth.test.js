import authReducer from '../auth';

import * as actionTypes from '../../actions/actionTypes';

describe('Auth reducer', () => {
    it('reducer should return initial state if no action', () => {
        expect(authReducer(undefined, {})).toEqual({
            user: null,
            error: null,
            loading: false,
            token: null
        });
    });

    it('reducer should return updated state of loading true is action in started', () => {
        expect(authReducer(undefined, { type: actionTypes.SIGNUP_USER_STARTED })).toEqual({
            user: null,
            error: null,
            loading: true,
            token: null
        });
    });

    it('reducer should update error in state if action is fail', () => {
        expect(authReducer(undefined, {
            type: actionTypes.SIGNUP_USER_FAILED,
            error: "failed loading"
        })).toEqual({
            user: null,
            error: "failed loading",
            loading: false,
            token: null
        });
    });

    it('reducer should update user in state if action is success', () => {
        expect(authReducer(undefined, {
            type: actionTypes.SIGNUP_USER_SUCCEEDED,
            data: { user: "failed loading" }
        })).toEqual({
            user: "failed loading",
            error: null,
            loading: false,
            token: null
        });
    });

    it('loading state should be true if email verification is started', () => {
        expect(authReducer(undefined, {type: actionTypes.VERIFY_USER_ACCOUNT_STARTED })).toEqual({
            user: null,
            error: null,
            loading: true,
            token: null
        });
    });

    it('token should be set on a successful email verififcation', () => {
        expect(authReducer(undefined, {
            type: actionTypes.VERIFY_USER_ACCOUNT_SUCCEDED,
            data: "token"
        })).toEqual({
            user: null,
            error: null,
            loading: false,
            token: "token"
        });
    });

    it('an error should be set on an unsuccessful email verififcation', () => {
        expect(authReducer(undefined, {
            type: actionTypes.VERIFY_USER_ACCOUNT_FAIL,
            error: "failed"
        })).toEqual({
            user: null,
            error: "failed",
            loading: false,
            token: null
        });
    });
});
