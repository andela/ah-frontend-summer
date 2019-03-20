import React from 'react';
import { shallow } from 'enzyme';

import {
    RatingContainer,
    mapDispatchToProps,
    mapStateToProps
} from '../RatingContainer';

describe('rate container', () => {
    const mockRateUpdateFetch = jest.fn();
    const dispatch = jest.fn();

    const ratingProps = {
        rate: mockRateUpdateFetch,
        match: {
            params: {
                slug: "12de-de"
            }
        }
    };

    const ratingContainer = shallow(<RatingContainer {...ratingProps} />);
    const ratingInstance = ratingContainer.instance();

    afterEach(() => {
        ratingContainer.setState({ rateScore: 0 });
    });
    it("should render rating component correctly", () => {
        expect(ratingContainer).toMatchSnapshot();
    });

    it("should prompt onStarClick updates rate score in state", () => {
        ratingInstance.onStarClick(4);
        expect(mockRateUpdateFetch).toHaveBeenCalled();
        expect(ratingContainer.state().rateScore).toBe(4);
    });

    it("should map dispatch to props", () => {
        mapDispatchToProps(dispatch).rate();
        expect(dispatch.mock.calls.length).toBe(1);
    });

    it("should map state to props", () => {
        const article = { "averageRating": 5 };
        expect(mapStateToProps({ article })).toEqual({ "averageRating": 5 });
    });
});
