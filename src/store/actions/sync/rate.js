export const RATE_SUCCESS = "RATE_SUCCESS";
export const RATE_FAILURE = "RATE_FAILURE";
export const GET_RATE_START = "GET_RATE_START";

export const rateSuccess = (data) => {
    return {
        type: RATE_SUCCESS,
        data
    };
};

export const rateFailure = (data) => {
    return {
        type: RATE_FAILURE,
        data
    };
};

export const rateStart = () => {
    return {
        type: GET_RATE_START
    };
};
