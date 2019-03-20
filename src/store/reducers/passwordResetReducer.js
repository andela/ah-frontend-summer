import { REQUEST_PASSWORD_RESET, RESET_PASSWORD } from "../actions/async/passwordResetActions";
import {ENDED, FAILED, STARTED, SUCCEEDED} from "../actions/async";
import { RESET_STATE } from "../actions/sync/passwordResetActions";


export const defaultState = {
    loading: false,
    error: null,
    msgDisplayed: true,
    message:''
};

const passwordResetReducer = (state=defaultState, action) => {

    if (typeof action === 'undefined'){
        return state;
    }

    switch(action.type){
    case REQUEST_PASSWORD_RESET + STARTED:
    case RESET_PASSWORD + STARTED:
        return {...state, loading: true};
    case REQUEST_PASSWORD_RESET + SUCCEEDED:
    case RESET_PASSWORD + SUCCEEDED:
        return {...state,
            message: action.payload.data.user.message, msgDisplayed: false};
    case REQUEST_PASSWORD_RESET + FAILED:
    case RESET_PASSWORD + FAILED:
        return {...state, error: action.payload.response.data};
    case REQUEST_PASSWORD_RESET + ENDED:
    case RESET_PASSWORD + ENDED:
        return {...state, loading: false};
    case RESET_STATE:
        return {...state, ...defaultState};
    default:
        return state;
    }
};
export default passwordResetReducer;
