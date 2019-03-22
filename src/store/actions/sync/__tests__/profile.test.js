import { 
    GET_PROFILE, 
    UPDATE_PROFILE, 
    STARTED_FETCH_USER_PROFILE, 
    STARTED_REQUEST_EDIT_PROFILE, 
    DISMISS_MESSAGE, 
    FAILED_FETCH_PROFILE, 
    FAILED_UPDATE_PROFILE 
} from "../../actionTypes";
import { 
    getUserProfile, 
    updateUserProfile, 
    startedFetchUserProfile, 
    startedrequestEditProfile, 
    dismissMessage, 
    failedFetchProfile, 
    failedUpdateProfile 
} from "../profiles";

describe("Synchronous profile action creators", () => {
    it("getUserProfile creates action to retrieve user profile", () => {
        expect(getUserProfile({})).toEqual({ type: GET_PROFILE, userProfile: {}});
    });

    it("updateUserProfie creates action to update user profile", () => {
        expect(updateUserProfile({ responseData: {}, message: ""})).toEqual({ 
            type: UPDATE_PROFILE, 
            userData: {}, 
            message: ""
        });
    });

    it("startedFetchUserProfile creates action to set loading to true", () => {
        const action = { type: STARTED_FETCH_USER_PROFILE };
        expect(startedFetchUserProfile()).toEqual(action);
    });

    it("startedrequestEditProfile creates action to set loading for edit button to true", () => {
        const action = { type: STARTED_REQUEST_EDIT_PROFILE };
        expect(startedrequestEditProfile()).toEqual(action);
    });

    it("dismissMessage creates action to dissmis message from ui", () => {
        expect(dismissMessage()).toEqual({ type: DISMISS_MESSAGE });
    });

    it("failedFetchProfile creates action to set message when fetching profile fails", () => {
        const action = { type: FAILED_FETCH_PROFILE, message: "" };
        expect(failedFetchProfile("")).toEqual(action);
    });

    it("failedUpdateProfile creates action to set message when updating profile fails", () => {
        const action = { type: FAILED_UPDATE_PROFILE, message: "" };
        expect(failedUpdateProfile("")).toEqual(action);
    });
});
