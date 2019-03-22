import loginReducer from "../login";
import {
    FAILED_LOGIN_USER,
    REMOVE_LOGIN_ERROR,
    LOGIN_USER,
    LOGIN_STARTED
} from "../../actions/sync/login";

describe("login reducer", () => {
    const initialState = {
        loginError: "",
        loading: false,
        "error": null, 
        "token": "sgjfhg348y8jhsgdf"
    };

    it("undefined action returns initial state", () => {
        expect(loginReducer(initialState, { type: "okay" })).toEqual(initialState);
    });

    it("LOGIN_STARTED action sets loading to  true", () => {
        expect(loginReducer(initialState, { type: LOGIN_STARTED }).loading).toBe(true);
    });

    it("FAILED_LOGIN_USER action sets loginError to true", () => {
        expect(
            loginReducer(initialState, { type: FAILED_LOGIN_USER, errorMsg: "okay" }).loginError
        ).toBe("okay");
    });

    it("REMOVE_LOGIN_ERROR action sets loginError to false", () => {
        expect(
            loginReducer(initialState, { type: REMOVE_LOGIN_ERROR }).loginError
        ).toBe("");
    });

    it("LOGIN_USER action sets username of logged in user and isAuthenticated to true if there's a token", () => {
        expect(
            loginReducer(initialState, {
                type: LOGIN_USER,
                userData: { user: { username: "oma0256", token: "sgjfhg348y8jhsgdf" } }
            })
        ).toEqual({
            loginError: "",
            loading: false,
            "error": null, 
            "token": "sgjfhg348y8jhsgdf"
        });
    });
});
