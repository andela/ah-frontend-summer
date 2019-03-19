import React from 'react';
import { shallow } from 'enzyme';

import Backdrop from './Backdrop';

describe('<Backdrop />', () => {
    it('Backdrop will render without crashing', () => {
        let wrapper = shallow(<Backdrop />);
        expect(wrapper).toMatchSnapshot();
    });
});
