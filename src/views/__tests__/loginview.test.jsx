import React from "react";
import { shallow } from "enzyme";
import { LoginView } from "../LoginView";

describe("login view", () => {
    const mockLoginFetch = jest.fn();
    const mockRemoveLoginError = jest.fn();
    const loginViewProps = {
        login: mockLoginFetch,
        dismissLoginError: mockRemoveLoginError,
        loginError: "",
        loading: false
    };
    const loginView = shallow(<LoginView {...loginViewProps} />);
    const loginViewInstance = loginView.instance();

    afterEach(() => {
        loginView.setState({ email: "", password: "" });
    });
 
    it("renders loginView component correctly", () => {
        expect(loginView).toMatchSnapshot();
    });

    it("onChangeHandler updates email in state when an event with value of email is passed", () => {
        loginViewInstance.onChangeHandler({
            target: { value: "okay@email.com", name: "email" }
        });
        expect(loginView.state().email).toBe("okay@email.com");
    });

    it("onChangeHandler updates password in state when an event with value of password is passed", () => {
        loginViewInstance.onChangeHandler({
            target: { value: "okay", name: "password" }
        });
        expect(loginView.state().password).toBe("okay");
    });

    it("onSubmitHandler dispatches loginFetch action creator when called", () => {
        loginViewInstance.onSubmitHandler({ preventDefault: () => null });
        expect(mockLoginFetch).toHaveBeenCalled();
    });

    it("onDismissHandler dispatches removeLoginError action creator to remove login error message", () => {
        loginViewInstance.onDismissHandler();
        expect(mockRemoveLoginError).toHaveBeenCalled();
    });
});
