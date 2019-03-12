import {mount} from "enzyme";
import React from "react";
import Banner from "../Banner";

describe('Banner Tests', () => {
    it('renders without crashing', () => {
        const bannerWrapper = mount(<Banner />);
        expect(bannerWrapper.find(Banner)).toHaveLength(1);
    });
});
