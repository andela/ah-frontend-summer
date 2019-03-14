import * as actionTypes from '../actions/actionTypes';

const initiaState = {
    user: null,
    error: null,
    loading: false,
    token: null
};

const authReducer = (state = initiaState, action) => {
    switch (action.type) {
    case actionTypes.SIGNUP_USER_STARTED:
        return {
            ...state,
            loading: true,
            error: null
        };
    case actionTypes.VERIFY_USER_ACCOUNT_STARTED:
        return {
            ...state,
            loading: true,
            error: null
        };
    case actionTypes.SIGNUP_USER_SUCCEEDED:
        return {
            ...state,
            loading: false,
            user: action.data.user,
            error: null
        };
    case actionTypes.VERIFY_USER_ACCOUNT_SUCCEDED:
        return {
            ...state,
            loading: false,
            token: action.data,
            error: null
        };
    case actionTypes.SIGNUP_USER_FAILED:
        return {
            ...state,
            loading: false,
            error: action.error
        };
    case actionTypes.VERIFY_USER_ACCOUNT_FAIL:
        return {
            ...state,
            loading: false,
            error: action.error
        };
    default: return state;
    }
};

export default authReducer;
