import axios from 'axios';
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { fetchUserProfile, requestEditProfile } from '../profiles';
import { 
    FAILED_FETCH_PROFILE, 
    STARTED_REQUEST_EDIT_PROFILE, 
    UPDATE_PROFILE, 
    FAILED_UPDATE_PROFILE 
} from '../../actionTypes';

jest.mock("axios");

describe("profile async actions", () => {
    const createMockStore = configureMockStore([thunk]);
    const store = createMockStore({});

    it("dispatches getUserProfile action creator on successfully profile retrieval", () => {
        axios.get.mockResolvedValue({ data: { profile: {} } });
        return store
            .dispatch(fetchUserProfile({ username: "dbjh", token: "dsjhf" }))
            .then(() => {
                expect(store.getActions()).toEqual([
                    {"type": "STARTED_FETCH_USER_PROFILE"}, { userProfile: {}, type: "GET_PROFILE" }
                ]);
            });
    });

    it("dispatches failedFetchProfile action creator on failed profile retrieval", () => {
        axios.get.mockRejectedValue({});
        return store
            .dispatch(fetchUserProfile({ username: "dbjh", token: "dsjhf" }))
            .then(() => {
                expect(store.getActions()[3]).toEqual({
                    type: FAILED_FETCH_PROFILE, 
                    message: { message: "Something went wrong, Please check your internet connection." }
                });
            });
    });

    it("dispatches updateUserProfie action creator on successfully profile update", () => {
        axios.patch.mockResolvedValue({ data: { profile: { username: "hdss" } } });
        const data = { first_name: "bfdhs", last_name: "mafbsk", bio: "abbk", image: { name: "fsd"}};
        return store
            .dispatch(requestEditProfile({ username: "dbjh", token: "dsjhf", data }))
            .then(() => {
                expect(store.getActions()[4]).toEqual({type: STARTED_REQUEST_EDIT_PROFILE});
                expect(store.getActions()[5]).toEqual({
                    message: "Edited profile.", 
                    type: UPDATE_PROFILE, 
                    userData: { profile: { username: "hdss" }}
                });
            });
    });

    it("dispatches failedUpdateProfile action creator on failed profile update", () => {
        axios.get.mockRejectedValue({});
        return store.dispatch(requestEditProfile()).then(() => {
            expect(store.getActions()[8]).toEqual({ 
                type: FAILED_UPDATE_PROFILE, 
                message: { message: "Something went wrong, Please check your internet connection." }
            });
        });
    });
});
