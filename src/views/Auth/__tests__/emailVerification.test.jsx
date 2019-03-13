import React from 'react';
import { shallow } from 'enzyme';

import { EmailVerification, mapDispatchToProps, mapStateToProps } from '../verification';

describe('tests EmailVerification View', () => {
    const props = {
        loading: false,
        onVerifyUserAccount: jest.fn(),
        error: null,
        token: null,
        match: { params: { token: "" } }
    };
    let wrapper = shallow(<EmailVerification {...props} />);
    let instance = wrapper.instance();

    it('should tell users to wait while activating their accounts', () => {
        wrapper.setProps({ loading: true });
        expect(instance.redirectToHome).toEqual(<p>Hang in tight your as your email is getting verified</p>);
    });

    it('should throw an error if it fails validating account', () => {
        wrapper.setProps({ loading: false });
        wrapper.setProps({ error: { msg: '' } });
        expect(instance.redirectToHome).not.toBeNull();
    });

    it('should redirect if token is valid and activates user account', () => {
        wrapper.setProps({ loading: false });
        wrapper.setProps({ error: null });
        wrapper.setProps({ token: "76756453456787kljhgfgdfhgjh" });
        expect(instance.redirectToHome).not.toBeNull();
    });

    it('should map state to props', () => {
        const auth = {
            auth: {
                loading: true,
                error: "got you",
                token: "977"
            }
        };
        expect(mapStateToProps({ auth })).toEqual({
            "error": undefined,
            "loading": undefined,
            "token": undefined
        });
    });

    it('should dispatch state to props', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).onVerifyUserAccount();
        expect(dispatch.mock.calls.length).toBe(1);
    });

});
