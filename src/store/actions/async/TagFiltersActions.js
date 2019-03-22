import axios from 'axios';
import { createActionThunk } from 'redux-thunk-actions';
import { FETCH_TAG_FILTER_ACTION } from '../actionTypes';


const fetchTagfilters = (url) => {
    return axios.get(url);
};

const fetchTagFiltersAction = createActionThunk(FETCH_TAG_FILTER_ACTION, fetchTagfilters, true);

export default fetchTagFiltersAction;