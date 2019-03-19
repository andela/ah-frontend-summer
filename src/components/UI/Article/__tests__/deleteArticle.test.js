import React from 'react';
import { shallow } from 'enzyme';

import DeleteArticleButtons from '../DeleteArticle';

describe('<DeleteArticleButtons />', () => {
    it('DeleteArticleButtons view will render without crashing', () => {
        let wrapper = shallow(<DeleteArticleButtons />);
        expect(wrapper).toMatchSnapshot();
    });
});
