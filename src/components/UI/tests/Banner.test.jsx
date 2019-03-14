import {mount} from "enzyme";
import React from "react";
import {StaticRouter} from "react-router-dom";
import Banner from "../Banner";

describe('Banner Tests', () => {
    it('renders without crashing', () => {
        const bannerWrapper = mount(<StaticRouter context={{}}><Banner /></StaticRouter>);
        expect(bannerWrapper.find(Banner)).toHaveLength(1);
    });
});
