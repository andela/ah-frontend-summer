import React from 'react';
import { shallow } from 'enzyme';

import { Signup, mapDispatchToProps, mapStateToProps } from '../Signup';

describe('tests Sigup View', () => {
    const push = jest.fn();
    const props = {
        registerUser: jest.fn(),
        history: { push },
        error: null,
        registered: null,
        passwordsDontMatch: false
    };
    let wrapper = shallow(<Signup {...props} />);
    let instance = wrapper.instance();

    afterEach(() => {
        instance.setState({
            registerUser: jest.fn(),
            history: { push },
            error: null,
            registered: null,
            passwordsDontMatch: false
        });
    });

    it('should redirect to login page', () => {
        instance.loginRedirectHandler();
        expect(push).toHaveBeenCalled();
    });
    ;
    it('should call register user', () => {
        instance.registerUserHanler();
        expect(props.registerUser).toHaveBeenCalled();
    });

    it('should validate email input value', () => {
        const e = {
            target: {
                value: "email@andela.com",
                name: "email"
            }, preventDefault: () => { }
        };
        instance.validateInputHandler(e);
        expect(instance.state.userInfo.email).toEqual('email@andela.com');
    });

    it('should validate username input value', () => {
        const e = {
            target: {
                value: "username",
                name: "username"
            }, preventDefault: () => { }
        };
        instance.validateInputHandler(e);
        expect(instance.state.userInfo.username).toEqual('username');
    });

    it('should validate email input value', () => {
        const e = {
            target: {
                value: "password",
                name: "password"
            }, preventDefault: () => { }
        };
        instance.validateInputHandler(e);
        expect(instance.state.userInfo.password).toEqual('password');
    });

    it('should validate confirm password input value', () => {
        const e = {
            target: {
                value: "password",
                name: "cPassword"
            }, preventDefault: () => { }
        };
        instance.validateInputHandler(e);
        expect(instance.state.confirmPassword).toEqual('password');
    });

    it('should set formError value in render to true is passwords don\'t match', () => {
        instance.setState({ passwordsDontMatch: true });
        expect(instance.formError).toBeTruthy();
    });

    it('should set formError value in render if there is an error in the email field', () => {
        wrapper.setProps({
            error: {
                errors: {
                    email: ["Email exists"]
                }
            }
        });
        expect(instance.failedError).toEqual("Email exists");
    });

    it('should set formError value in render if there is an error in the username field', () => {
        wrapper.setProps({
            error: {
                errors: {
                    username: ["username already exists"]
                }
            }
        })
        expect(instance.failedError).toEqual("username already exists");
    });

    it('should set formError value in render if there is an error in the password field', () => {
        wrapper.setProps({
            error: {
                errors: {
                    password: ["password is too short"]
                }
            }
        });
        expect(instance.failedError).toEqual("password is too short");
    });

    it('should map state to props', () => {
        const auth = {
            auth: {
                loading: true,
                error: "got you",
                user: "registered"
            }
        }

        expect(mapStateToProps({ auth })).toEqual({
            "error": undefined,
            "loading": undefined,
            "registered": undefined
        });
    });

    it('should dispatch state to props', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).registerUser();
        expect(dispatch.mock.calls.length).toBe(1);
    });
});
