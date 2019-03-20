import React from "react";
import { shallow } from 'enzyme';
import RequestPasswordReset from "../RequestPasswordReset";

describe('Request password reset component tests', () => {
    const props = {
        isDisplayed: false,
        onInputChange: jest.fn(),
        onSubmit: jest.fn(),
        disabled: true,
        loading: false,
        showError: false,
    }
    it('renders container consistently', () => {
        const Wrapper = shallow(<RequestPasswordReset {...props}/>);
        expect(Wrapper).toMatchSnapshot();
    });

});
