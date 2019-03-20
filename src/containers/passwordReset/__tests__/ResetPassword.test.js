import React from "react";
import { shallow } from 'enzyme';
import { PasswordResetContainer } from "../ResetPassword";

describe('Reset password container tests', () => {
    it('renders container consistently', () => {
        const Wrapper = shallow(<PasswordResetContainer isDisplayed={false} error={null} />);
        expect(Wrapper).toMatchSnapshot();
    });

    it('renders container correctly with fetch error', () => {
        const Wrapper = shallow(<PasswordResetContainer isDisplayed={true} error={{errors:{error:["error"]}}} />);
        expect(Wrapper).toMatchSnapshot();
    });

    it('renders the ResetPassword Component', () => {
        const Wrapper = shallow(<PasswordResetContainer isDisplayed={false} error={null} />);
        expect(Wrapper.find('ResetPassword')).toHaveLength(1);
    });

    it('renders the main div', () => {
        const Wrapper = shallow(<PasswordResetContainer isDisplayed={false} error={null} />);
        expect(Wrapper.find('div')).toHaveLength(1);
    });

    let wrapper = shallow(<PasswordResetContainer isDisplayed={false} error={null} />);
    let wrapperInstance = wrapper.instance();

    it('throws error when passwords do not match', () => {
        wrapperInstance.setState({
            password: "1234",
            confirmPassword: "12345",
        })
        wrapperInstance.onSubmit();
        expect(wrapperInstance.state.errorMsg).toEqual("Passwords do not match!");
    });

    it('does updates the state on changing input', () => {
        const e = {target: {
            name: "password",
            value: "123456"
        }}
        wrapperInstance.onInputChange(e);
        expect(wrapperInstance.state.password).toEqual("123456");

    });
});
