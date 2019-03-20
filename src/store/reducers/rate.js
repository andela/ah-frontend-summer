import {
    RATE_SUCCESS,
    RATE_FAILURE,
    GET_RATE_START
} from '../actions/sync/rate';

const initialState = {
    rating: null,
    error: null,
    averageRating: null
};

const rateReducer = (state=initialState, action) => {
    switch (action.type){
    case GET_RATE_START:
        return {
            ...state,
            rating: null,
            error: null,
            averageRating: null
        };
    case RATE_SUCCESS:
        return {
            ...state,
            rating: action.data.message,
            averageRating: action.data.articles.average_ratings
        };
    case RATE_FAILURE:
        return {
            ...state,
            rating: null,
            averageRating: action.data.articles.average_ratings
        };
    default:
        return state;
    }
};

export default rateReducer;
