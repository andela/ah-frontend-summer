import axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import loginFetch from "../login";
import { LOGIN_USER, FAILED_LOGIN_USER } from "../../sync/login";

jest.mock("axios");

describe("login async actions", () => {
    const createMockStore = configureMockStore([thunk]);
    const store = createMockStore({});
    const mockPushMethod = jest.fn();

    it("dispatches loginUser action creator on successful login", () => {
        axios.post.mockResolvedValue({ data: {user:{ username: "oma0256", "token": "sdbfh"}} });
        return store
            .dispatch(loginFetch({ history: { push: mockPushMethod } }))
            .then(() => {
                expect(store.getActions()).toEqual([
                    {"type": "LOGIN_STARTED"}, { userData: {user:{ username: "oma0256", "token": "sdbfh"}}, type: LOGIN_USER }
                ]);
                expect(localStorage.setItem).toHaveBeenCalledWith("username", "oma0256");
                expect(localStorage.setItem).toHaveBeenCalledWith("token", "sdbfh");
            });
    });

    it("dispatches failedLoginUser action creator on failed login", () => {
        axios.post.mockRejectedValue({ response: { status: 400 } });
        return store.dispatch(loginFetch({ })).then(() => {
            expect(store.getActions()[3]).toEqual({ type: FAILED_LOGIN_USER, errorMsg: "Incorrect email or password."
            });
        });
    });
    it("dispatches failedLoginUser action creator on network failure", () => {
        axios.post.mockRejectedValue({ });
        return store.dispatch(loginFetch({ })).then(() => {
            expect(store.getActions()[5]).toEqual({ type: FAILED_LOGIN_USER, errorMsg: "Something went wrong. Please check your internet connection." });
        });
    });
});
