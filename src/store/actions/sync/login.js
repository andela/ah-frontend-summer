export const LOGIN_USER = "LOGIN_USER";
export const FAILED_LOGIN_USER = "FAILED_LOGIN_USER";
export const REMOVE_LOGIN_ERROR = "REMOVE_LOGIN_ERROR";
export const LOGIN_STARTED = "LOGIN_STARTED";

export const loginUser = userData => {
    return {
        type: LOGIN_USER,
        userData
    };
};

export const failedLoginUser = errorMsg => {
    return {
        type: FAILED_LOGIN_USER,
        errorMsg
    };
};

export const removeLoginError = () => {
    return {
        type: REMOVE_LOGIN_ERROR
    };
};

export const loginStarted = () => {
    return {
        type: LOGIN_STARTED
    };
};
