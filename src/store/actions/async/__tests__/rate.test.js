import axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import updateRateValue from "../rate";
import {
    RATE_SUCCESS,

} from '../../sync/rate';

jest.mock("axios");

const createMockStore = configureMockStore([thunk]);
const store = createMockStore({});
const mockPushMethod = jest.fn();


describe('rate an article action', () => {

    afterEach(() => {
        axios.post.mockClear();
    });
    it("should dispatch rate action to rate an article", () => {
        axios.post.mockResolvedValue({ data: { articles: {} } });
        return store
            .dispatch(updateRateValue({ history: { push: mockPushMethod } }))
            .then(() => {
                expect(store.getActions()).toEqual(
                    [{"type": "GET_RATE_START"}, {"data": {}, "type": "RATE_SUCCESS"}]
                );
            });
    });

    it("should dispatch rate action to log error with response", () => {
        axios.post.mockRejectedValue({ response: 
            { data: { message: "You have an error", articles: { average_ratings: 5 } } } });
        store
            .dispatch(updateRateValue({ history: { push: mockPushMethod } }))
            .then(() => {
                expect(store.getActions()[3]).toEqual(
                    {"data": {"average_ratings": 5}, "type": "RATE_FAILURE"}
                );
            });
    });
});
