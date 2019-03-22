import profileReducer from "../profiles";
import { 
    GET_PROFILE, 
    UPDATE_PROFILE, 
    STARTED_FETCH_USER_PROFILE, 
    STARTED_REQUEST_EDIT_PROFILE, 
    DISMISS_MESSAGE, 
    FAILED_UPDATE_PROFILE 
} from "../../actions/actionTypes";

describe("profile reducer", () => {
    const initialState = {
        profile: {},
        loading: false,
        loadingEditButton: false,
        profileUpdateMessage: "",
        profileRetrieveMessage: "",
    };

    it("undefined action returns initial state", () => {
        expect(profileReducer(initialState, { type: "okay" })).toEqual(initialState);
    });

    it("GET_PROFILE action sets profile and loading state", () => {
        const action = { type: GET_PROFILE, userProfile: [] };
        expect(profileReducer(initialState, action).loading).toBe(false);
        expect(profileReducer(initialState, action).profile).toEqual([]);
    });

    it("UPDATE_PROFIE action sets profile and loadingEditButton state", () => {
        const action = { type: UPDATE_PROFILE, userData: [] };
        expect(profileReducer(initialState, action).loadingEditButton).toBe(false);
        expect(profileReducer(initialState, action).profile).toEqual([]);
    });

    it("STARTED_FETCH_USER_PROFILE action sets loading in state", () => {
        const action = { type: STARTED_FETCH_USER_PROFILE };
        expect(profileReducer(initialState, action).loading).toBe(true);
    });

    it("STARTED_REQUEST_EDIT_PROFILE action sets loadingEditButton in state", () => {
        const action = { type: STARTED_REQUEST_EDIT_PROFILE };
        expect(profileReducer(initialState, action).loadingEditButton).toBe(true);
    });

    it("DISMISS_MESSAGE action sets profileUpdateMessage and profileRetrieveMessage to empty string in state", () => {
        const action = { type: DISMISS_MESSAGE };
        expect(profileReducer(initialState, action).profileUpdateMessage).toBe("");
    });

    it("FAILED_UPDATE_PROFILE action sets profileUpdateMessage and loadingEditButton to in state", () => {
        const action = { type: FAILED_UPDATE_PROFILE, message: "" };
        expect(profileReducer(initialState, action).profileUpdateMessage).toBe("");
        expect(profileReducer(initialState, action).loadingEditButton).toBe(false);
    });
})
