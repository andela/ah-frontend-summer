import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import axios from 'axios';
import {ENDED, FAILED, STARTED, SUCCEEDED} from "../index";
import {
    REQUEST_PASSWORD_RESET,
    RESET_PASSWORD,
    requestPasswordResetAction,
    resetPasswordAction
} from "../passwordResetActions";

jest.mock('axios');

const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = mockStore({});

describe("Request Password Reset Actions Tests", () => {
    beforeEach(() => {
        store.clearActions();
    });

    it("dispatches correct action on successful response", (done) => {
        axios.post.mockResolvedValue();

        store.dispatch(requestPasswordResetAction()).then(() => {
            const actions = store.getActions();
            expect(actions).toHaveLength(3);
            expect(actions[0].type).toEqual(REQUEST_PASSWORD_RESET + STARTED);
            expect(actions[1].type).toEqual(REQUEST_PASSWORD_RESET + SUCCEEDED);
            expect(actions[2].type).toEqual(REQUEST_PASSWORD_RESET + ENDED);
            done();
        });
    });
    it("dispatches correct action on unsuccessful response", (done) => {
        axios.post.mockRejectedValue();

        store.dispatch(requestPasswordResetAction()).then(() => {
            const actions = store.getActions();
            expect(actions).toHaveLength(3);
            expect(actions[0].type).toEqual(REQUEST_PASSWORD_RESET + STARTED);
            expect(actions[1].type).toEqual(REQUEST_PASSWORD_RESET + FAILED);
            expect(actions[2].type).toEqual(REQUEST_PASSWORD_RESET + ENDED);
            done();
        });
    });
});

describe("Reset PasswordActions Tests", () => {
    beforeEach(() => {
        store.clearActions();
    });

    it("dispatches correct action on successful response", (done) => {
        axios.post.mockResolvedValue();

        store.dispatch(resetPasswordAction()).then(() => {
            const actions = store.getActions();
            expect(actions).toHaveLength(3);
            expect(actions[0].type).toEqual(RESET_PASSWORD + STARTED);
            expect(actions[1].type).toEqual(RESET_PASSWORD + SUCCEEDED);
            expect(actions[2].type).toEqual(RESET_PASSWORD + ENDED);
            done();
        });
    });

    it("dispatches correct action on usuccessful response", (done) => {
        axios.post.mockRejectedValue();

        store.dispatch(resetPasswordAction()).then(() => {
            const actions = store.getActions();
            expect(actions).toHaveLength(3);
            expect(actions[0].type).toEqual(RESET_PASSWORD + STARTED);
            expect(actions[1].type).toEqual(RESET_PASSWORD + FAILED);
            expect(actions[2].type).toEqual(RESET_PASSWORD + ENDED);
            done();
        });
    });
});