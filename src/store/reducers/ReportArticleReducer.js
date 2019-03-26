import { 
    REPORT_ARTICLE_STARTED, 
    REPORT_ARTICLE_SUCCEDED, 
    REPORT_ARTICLE_FAILED, 
    DISMISS_MESSAGE
} from "../actions/actionTypes";

const initialState = {
    loading: false,
    message: '',
    errorMsg: ''
};

const ReportArticleReducer = (state = initialState, action) => {
    switch(action.type) {
        case REPORT_ARTICLE_STARTED:
            return {
                ...state,
                loading: true
            };
        case REPORT_ARTICLE_SUCCEDED:
            return {
                ...state,
                loading: false,
                message: action.message
            };
        case REPORT_ARTICLE_FAILED:
            return {
                ...state,
                loading: false,
                errorMsg: action.errorMsg
            };
        case DISMISS_MESSAGE:
            return {
                ...state,
                message: '',
                errorMsg: ''
            };
        default:
            return state;
    }
};

export default ReportArticleReducer;
