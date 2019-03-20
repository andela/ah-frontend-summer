import axios from 'axios';
import { createActionThunk } from 'redux-thunk-actions';


export const REQUEST_PASSWORD_RESET = "REQUEST_PASSWORD_RESET";
export const RESET_PASSWORD = "RESET_PASSWORD";

const requestPasswordUrl = (
    'https://ah-backend-summer-staging.herokuapp.com/api/v1/user/request-password-reset'
);

const requestPasswordReset = (email) => {
    return axios.post(requestPasswordUrl, {'email': email});

};
const resetPasswordUrl = (
    'https://ah-backend-summer-staging.herokuapp.com/api/v1/user/reset-password/'
);

const resetPassword = (token, password) => {
    return axios.post(resetPasswordUrl + token, {'new_password': password});

};

export const requestPasswordResetAction = createActionThunk(
    REQUEST_PASSWORD_RESET, requestPasswordReset, true
);

export const resetPasswordAction = createActionThunk(
    RESET_PASSWORD, resetPassword, true
);
