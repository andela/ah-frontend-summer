import React from 'react';
import { mount } from "enzyme";

import Rating from '../Rating';

describe('Rating', () => {
    const onStarClick = jest.fn();
    const ratingProps = {
        rateScore: 4,
        onStarClick: onStarClick,
        averageRating: 4
    };
    const rate = mount(<Rating {...ratingProps} />);
    it("should render rate component correctly", () => {
        expect(rate).toMatchSnapshot();
    });
});
