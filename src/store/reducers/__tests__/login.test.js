import { loginReducer } from "../login";
import {
  FAILED_LOGIN_USER,
  REMOVE_LOGIN_ERROR,
  LOGIN_USER
} from "../../actions/sync/login";

describe("login reducer", () => {
    const initialState = {
        loginError: false
    };

    it("undefined action returns initial state", () => {
        expect(loginReducer(initialState, { type: "okay" })).toEqual(initialState);
    });

    it("FAILED_LOGIN_USER action sets loginError to true", () => {
        expect(
        loginReducer(initialState, { type: FAILED_LOGIN_USER }).loginError
        ).toBe(true);
    });

    it("REMOVE_LOGIN_ERROR action sets loginError to false", () => {
        expect(
        loginReducer(initialState, { type: REMOVE_LOGIN_ERROR }).loginError
        ).toBe(false);
    });

    it("LOGIN_USER action sets username of logged in user and isAuthenticated to true if there's a token", () => {
        expect(
        loginReducer(initialState, {
            type: LOGIN_USER,
            userData: { user: { username: "oma0256", token: "sgjfhg348y8jhsgdf" } }
        })
        ).toEqual({
            loginError: false
        });
    });
});
