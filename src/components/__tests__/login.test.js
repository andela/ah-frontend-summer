import React from "react";
import { mount } from "enzyme";
import { BrowserRouter } from 'react-router-dom';
import Login from "../Login";

describe("Login", () => {
    const onChangeHandlerMock = jest.fn();
    const onSubmitHandlerMock = jest.fn();
    const responseFacebookMock = jest.fn();
    const responseGoogleMock = jest.fn();
    const onBlurHandlerMock = jest.fn();
    
    const loginProps = {
        onChangeHandler: onChangeHandlerMock,
        loginError: "whsdhfish",
        onSubmitHandler: onSubmitHandlerMock,
        email: "",
        password: "",
        onDismissHandler: jest.fn(),
        loading: false,
        responseFacebook: responseFacebookMock,
        responseGoogle: responseGoogleMock,
        onBlurHandler: onBlurHandlerMock,
        isEmailValid: true
    };
    const login = mount(<BrowserRouter><Login {...loginProps} /></BrowserRouter>);

    it("renders login component correctly", () => {
        expect(login).toMatchSnapshot();
    });

    it("calls onChandeHandler when the email or password input is changed", () => {
        login.find('input[name="email"]').simulate("change");
        expect(onChangeHandlerMock).toHaveBeenCalled();
        login.find('input[name="password"]').simulate("change");
        expect(onChangeHandlerMock).toHaveBeenCalled();
    });

    it("renders Message component when loginError is true", () => {
        expect(login.find("Message").exists()).toBe(true);
    });

    it("calls onSubmitHandler when form is submited", () => {
        login.find("form").simulate("submit");
        expect(onSubmitHandlerMock).toHaveBeenCalled();
    });

});
