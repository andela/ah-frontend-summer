import ReportArticleReducer from "../ReportArticleReducer";
import { 
    REPORT_ARTICLE_STARTED, 
    REPORT_ARTICLE_SUCCEDED, 
    REPORT_ARTICLE_FAILED 
} from "../../actions/actionTypes";

describe('ReportArticleReducer', () => {
    const state = {
        loading: false,
        message: '',
        errorMsg: ''
    };

    it('returns state if action type is undefined', () => {
        expect(ReportArticleReducer(state, { type: 'okay' })).toEqual(state);
    });

    it('REPORT_ARTICLE_STARTED action sets loading to true in state', () => {
        const newState = ReportArticleReducer(state, {
            type: REPORT_ARTICLE_STARTED
        });
        expect(newState.loading).toBe(true);
    });

    it('REPORT_ARTICLE_SUCCEDED action sets loading and message in state', () => {
        const newState = ReportArticleReducer(state, {
            type: REPORT_ARTICLE_SUCCEDED,
            message: 'okay'
        });
        expect(newState.loading).toBe(false);
        expect(newState.message).toBe('okay');
    });

    it('REPORT_ARTICLE_FAILED action sets loading and errorMsg in state', () => {
        const newState = ReportArticleReducer(state, {
            type: REPORT_ARTICLE_FAILED,
            errorMsg: 'okay'
        });
        expect(newState.loading).toBe(false);
        expect(newState.errorMsg).toBe('okay');
    });
});