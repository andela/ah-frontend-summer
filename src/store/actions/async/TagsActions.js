import axios from 'axios';
import { createActionThunk } from 'redux-thunk-actions';
import { FETCH_TAGS_ACTION } from '../actionTypes';

const url = 'https://ah-backend-summer-staging.herokuapp.com/api/v1/articles/tags';
const fetchTags = () => {
    return axios.get(url);
};

const fetchTagsAction = createActionThunk(FETCH_TAGS_ACTION, fetchTags, true);

export default fetchTagsAction;
