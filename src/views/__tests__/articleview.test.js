import React from 'react';
import { shallow } from "enzyme";

import ArticlesView from '../ArticlesView';

describe('render Article View Container', () => {
    const wrapper = shallow(<ArticlesView />);
    it("renders rate component correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });
});
