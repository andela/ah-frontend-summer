import { LOGIN_USER, FAILED_LOGIN_USER, REMOVE_LOGIN_ERROR, LOGIN_STARTED } from "../actions/sync/login";

const initialState = {
    token: null,
    loginError: "",
    loading: false,
    error: null
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
    case LOGIN_STARTED:
        return {
            ...state,
            loading: true
        };
    case LOGIN_USER:
        return {
            ...state,
            loading: false,
            loginError: "",
            token: action.userData.user.token,
            error: null
        };
    case FAILED_LOGIN_USER:
        return {
            ...state,
            loading: false,
            loginError: action.errorMsg,
            token: null,
            error: action.error
        };
    case REMOVE_LOGIN_ERROR:
        return {
            ...state,
            loginError: ""
        };
    default:
        return state;
    }
};

export default loginReducer;
