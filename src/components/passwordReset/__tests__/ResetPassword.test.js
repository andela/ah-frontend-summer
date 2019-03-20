import React from "react";
import { shallow } from 'enzyme';
import ResetPassword from "../ResetPassword";

describe('Reset password component tests', () => {

    const props = {
        isDisplayed: false,
        onInputChange: jest.fn(),
        disabled: true,
        loading: false,
        onSubmit: jest.fn()
    }

    it('renders container consistently', () => {
        const Wrapper = shallow(<ResetPassword {...props} showError={false}/>);
        expect(Wrapper).toMatchSnapshot();
    });

    it('renders error message when there is error', () => {
        const Wrapper = shallow(<ResetPassword {...props} showError={true}/>);
        expect(Wrapper.find('Message')).toHaveLength(1);
    });

    it('renders error message when there is error', () => {
        const Wrapper = shallow(<ResetPassword {...props} showError={false}/>);
        expect(Wrapper.find('Message')).toHaveLength(0);
    });
});
