import { LOGIN_USER, FAILED_LOGIN_USER, REMOVE_LOGIN_ERROR } from "../actions/sync/login";

const initialState = {
    loginError: false,
};

export const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                loginError: false
            };
        case FAILED_LOGIN_USER:
            return {
                ...state,
                loginError: true
            };
        case REMOVE_LOGIN_ERROR:
            return {
                ...state,
                loginError: false
            };
        default:
            return state;
    }
};
