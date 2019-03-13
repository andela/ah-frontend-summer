import React from 'react';
import { shallow } from 'enzyme';

import SigunForm from './Signup';

describe('<Signup />', () => {
    it('Signup will render without crashing', () => {
        let wrapper = shallow(<SigunForm />);
        expect(wrapper).toMatchSnapshot();
    });
});
