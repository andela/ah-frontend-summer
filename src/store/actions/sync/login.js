export const LOGIN_USER = "LOGIN_USER";
export const FAILED_LOGIN_USER = "FAILED_LOGIN_USER";
export const REMOVE_LOGIN_ERROR = "REMOVE_LOGIN_ERROR";

export const loginUser = userData => {
    return {
        type: LOGIN_USER,
        userData
    };
};

export const failedLoginUser = () => {
    return {
        type: FAILED_LOGIN_USER
    };
};

export const removeLoginError = () => {
    return {
        type: REMOVE_LOGIN_ERROR
    };
};
