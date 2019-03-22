import { 
    GET_PROFILE, 
    UPDATE_PROFILE, 
    STARTED_FETCH_USER_PROFILE, 
    STARTED_REQUEST_EDIT_PROFILE, 
    FAILED_UPDATE_PROFILE, 
    DISMISS_MESSAGE 
} from "../actions/actionTypes";

const initialState = {
    profile: {},
    loading: false,
    loadingEditButton: false,
    profileUpdateMessage: "",
    profileRetrieveMessage: ""
};

const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: action.userProfile,
                loading: false
            };
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: action.userData,
                loadingEditButton: false,
                profileUpdateMessage: action.message
            };
        case STARTED_FETCH_USER_PROFILE:
            return {
                ...state,
                loading: true
            };
        case STARTED_REQUEST_EDIT_PROFILE:
            return {
                ...state,
                loadingEditButton: true,
            };
        case DISMISS_MESSAGE:
            return {
                ...state,
                profileUpdateMessage: "",
                profileRetrieveMessage: ""
            };
        case FAILED_UPDATE_PROFILE:
            return {
                ...state,
                loadingEditButton: false,
                profileUpdateMessage: action.message
            };
        default:
            return state;
    }
};

export default profileReducer;
