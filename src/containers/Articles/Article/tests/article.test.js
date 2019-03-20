import React from 'react';
import { shallow } from "enzyme";

import Article from '../Article';

describe('render Article Container', () => {
    const wrapper = shallow(<Article />);
    it("should render rate component correctly", () => {
        expect(wrapper).toMatchSnapshot();
    });
});
