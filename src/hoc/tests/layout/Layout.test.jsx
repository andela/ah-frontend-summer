import React from 'react';
import { shallow } from 'enzyme';
import Layout from '../../layout/Layout';

describe('Layout tests', () => {
    const wrapper = shallow(<Layout />);
    test('render component without failing', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
