import rateReducer from '../rate';
import {
    RATE_SUCCESS,
    RATE_FAILURE,
    GET_RATE_START
} from '../../actions/sync/rate';

describe('rate article reducer', () => {
    const initialState = {
        rating: null,
        error: null,
        average_rating: null
    };
    it('should define an undefined action that will return initial state', () => {
        expect(rateReducer(initialState, { type: "rateStart" })).toEqual(initialState);
    });

    it("should prompt RATE_SUCCESS action sets rating to returned message", () => {
        expect(
            rateReducer(initialState,
                {
                    type: RATE_SUCCESS,
                    data: { message: "You have rated this article", articles: { average_ratings: 5 } }
                }).rating
        ).toBe("You have rated this article");
        expect(
            rateReducer(initialState,
                {
                    type: RATE_SUCCESS,
                    data: { message: "You have rated this article", articles: { average_ratings: 5 } }
                }).averageRating
        ).toBe(5);
    });

    it("should prompt RATE_FAILURE action sets error to the error that is returned", () => {
        expect(
            rateReducer(initialState,
                {
                    type: RATE_FAILURE,
                    data: {
                        articles: { average_ratings: 5 }
                    }
                }).averageRating
        ).toBe(5);
    });
    it("should prompt GET_RATE_START action sets state to 0", () => {
        expect(
            rateReducer(initialState,
                {
                    type: GET_RATE_START
                }).rating
        ).toBe(null);
    });

});
