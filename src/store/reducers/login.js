import { LOGIN_USER, FAILED_LOGIN_USER, REMOVE_LOGIN_ERROR, LOGIN_STARTED } from "../actions/sync/login";

const initialState = {
    loading: false,
    loginError: "",
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
    case LOGIN_STARTED:
        return {
            ...state,
            loading: true
        }
    case LOGIN_USER:
        return {
            ...state,
            loading: false,
            loginError: ""
        };
    case FAILED_LOGIN_USER:
        return {
            ...state,
            loading: false,
            loginError: action.errorMsg
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
