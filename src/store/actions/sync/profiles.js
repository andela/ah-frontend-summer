import { 
    GET_PROFILE, 
    DISMISS_MESSAGE, 
    UPDATE_PROFILE, 
    STARTED_FETCH_USER_PROFILE, 
    STARTED_REQUEST_EDIT_PROFILE,
    FAILED_FETCH_PROFILE, 
    FAILED_UPDATE_PROFILE 
} from '../actionTypes';

export const getUserProfile = userProfile => {
    return {
        type: GET_PROFILE,
        userProfile
    };
};

export const updateUserProfile = payload => {
    return {
        type: UPDATE_PROFILE,
        userData: payload.responseData,
        message: payload.message
    };
};

export const startedFetchUserProfile = () => {
    return {
        type: STARTED_FETCH_USER_PROFILE
    };
};

export const startedrequestEditProfile = () => {
    return {
        type: STARTED_REQUEST_EDIT_PROFILE
    };
};

export const dismissMessage = () => {
    return {
        type: DISMISS_MESSAGE
    };
};

export const failedFetchProfile = message => {
    return {
        type: FAILED_FETCH_PROFILE,
        message
    };
};

export const failedUpdateProfile = message => {
    return {
        type: FAILED_UPDATE_PROFILE,
        message
    };
};
