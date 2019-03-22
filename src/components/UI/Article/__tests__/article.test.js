import React from 'react';
import { shallow } from 'enzyme';

import Article from '../Article';

describe('<Article />', () => {
    it('Article will render without crashing', () => {
        const props = {
            body: "body",
            tags:[]
        };
        let wrapper = shallow(<Article {...props}/>);
        expect(wrapper).toMatchSnapshot();
    });
});
