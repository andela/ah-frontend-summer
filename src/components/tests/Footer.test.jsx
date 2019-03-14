import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../Footer';

describe('Footer test', () => {
    const wrapper = shallow(<Footer />);
    test('render component without failing', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
