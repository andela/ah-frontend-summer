import {
    loginUser,
    LOGIN_USER,
    failedLoginUser,
    FAILED_LOGIN_USER,
    removeLoginError,
    REMOVE_LOGIN_ERROR
} from "../login";

describe("synchronous login action creators", () => {
    it("creates action to store authenticated user username and set isAuthenticated to true", () => {
        expect(loginUser({})).toEqual({ type: LOGIN_USER, userData: {} });
    });

    it("creates action to set loginError to true", () => {
        expect(failedLoginUser("okay")).toEqual({ type: FAILED_LOGIN_USER, errorMsg: "okay" });
    });

    it("creates action to set loginError to false", () => {
        expect(removeLoginError()).toEqual({ type: REMOVE_LOGIN_ERROR });
    });
});
