import axios from "axios";

import {
    rateFailure,
    rateSuccess,
    rateStart
} from "../sync/rate";

import { infoToast, successToast } from '../../../components/UI/Toast/toast';

const token = localStorage.getItem('token');

const updateRateValue = (payload) => {
    const headers = {
        Authorization: 'Bearer ' + token,
        Accept: 'application/json, */*',
        'Content-type': 'application/json'
    };
    return async dispatch => {
        dispatch(rateStart());
        try {
            const response = await axios.post(payload.url, payload.data, { headers: headers });
            successToast(response.data.articles.message);
            dispatch(rateSuccess(response.data.articles));
        } catch (error) {
            if (error.response) {
                infoToast(error.response.data.articles.message);
                dispatch(rateFailure(error.response.data.articles));
            }
        }
    };
};

export default updateRateValue;
