import { 
    rateFailure, 
    rateSuccess,
    rateStart, 
    RATE_SUCCESS, 
    RATE_FAILURE,
    GET_RATE_START } from "../rate";

describe ('synchronous rate article actions', () => {
    it("should create action to rate an article succesffully", () => {
        expect(rateSuccess({})).toEqual({ type: RATE_SUCCESS, data: {} });
    });
    it("should create action to rate an article failure", () => {
        expect(rateFailure({})).toEqual({ type: RATE_FAILURE, data: {} });
    });
    it("should create action to start rating and reset state ", () => {
        expect(rateStart({})).toEqual({ type: GET_RATE_START});
    });
});
