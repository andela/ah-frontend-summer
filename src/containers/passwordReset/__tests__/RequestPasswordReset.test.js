import React from "react";
import { shallow } from 'enzyme';
import { PasswordRequestContainer } from "../RequestPasswordReset";

describe('Request password reset container tests', () => {
    it('renders container consistently', () => {
        const Wrapper = shallow(<PasswordRequestContainer error={null} isDisplayed={false} />);
        expect(Wrapper).toMatchSnapshot();
    });

    it('renders container correctly with fetch error', () => {
        const Wrapper = shallow(<PasswordRequestContainer error={{errors:["error"]}} isDisplayed={true} />);
        expect(Wrapper).toMatchSnapshot();
    });
});
