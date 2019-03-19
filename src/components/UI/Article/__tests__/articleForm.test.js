import React from 'react';
import { shallow } from 'enzyme';

import ArticleForm from '../ArticleForm';

describe('<ArticleForm />', () => {
    it('ArticleForm will render without crashing', () => {
        let wrapper = shallow(<ArticleForm />);
        expect(wrapper).toMatchSnapshot();
    });
});
