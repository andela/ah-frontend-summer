import React from 'react';
import { shallow } from 'enzyme';

import Modal from './Modal';

describe('tests Modal component', () => {
    const props = {
        modalClosed: jest.fn(),
        show: false,
        children: null
    };
    let wrapper = shallow(<Modal {...props} />);

    it('should render with out crashing', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
