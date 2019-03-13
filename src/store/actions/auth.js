import axios from 'axios';

import * as actionTypes from './actionTypes';

export const url = "https://ah-backend-summer-staging.herokuapp.com/api/v1/users";

export const signupUserStarted = () => {
    return { type: actionTypes.SIGNUP_USER_STARTED };
};

export const signupUserFailed = (error) => {
    return { type: actionTypes.SIGNUP_USER_FAILED, error };
};

export const signupUserSucceeded = (data) => {
    return {
        type: actionTypes.SIGNUP_USER_SUCCEEDED,
        data
    };
};

export const registerUser = (data) => {
    return async (dispatch) => {
        dispatch(signupUserStarted())
        try {
            const response = await axios.post(url, data)
            dispatch(signupUserSucceeded(response.data))
        } catch (error) {
            dispatch(signupUserFailed(error.response.data));
        }
    };
};

export const verifyUserAccountStarted = () => {
    return { type: actionTypes.VERIFY_USER_ACCOUNT_STARTED };
};

export const verifyUserAccountFailed = (error) => {
    return { type: actionTypes.VERIFY_USER_ACCOUNT_FAIL, error };
};

export const verifyUserAccountSucceeded = (data) => {
    return { type: actionTypes.VERIFY_USER_ACCOUNT_SUCCEDED, data };
};

export const verifyUserAccount = (token) => {
    return async (dispatch) => {
        dispatch(verifyUserAccountStarted())
        try {
            const response = await axios.get(`${url}/` + token)
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('username', response.data.username)
            dispatch(verifyUserAccountSucceeded(response.data))
        } catch (error) {
            dispatch(verifyUserAccountFailed(error.response.data))
        }
    };
};
