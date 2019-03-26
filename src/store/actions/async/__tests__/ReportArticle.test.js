import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { reportArticle } from '../ReportArticle';
import { 
    REPORT_ARTICLE_STARTED, 
    REPORT_ARTICLE_SUCCEDED, 
    REPORT_ARTICLE_FAILED
} from '../../actionTypes';

describe('Report article async actions', () => {
    const createMockStore = configureMockStore([thunk]);
    const store = createMockStore({});

    beforeEach(() => {
        store.clearActions();
    });

    it('reportArticle dispatches reportArticleSucceded on successful article report', () => {
        axios.post.mockResolvedValue({});
        const payload = { token: 'dsf', data: {}, push: jest.fn(), slug: "ds" };
        return store
            .dispatch(reportArticle(payload))
            .then(() => {
                expect(store.getActions()[0]).toEqual({ 
                    type: REPORT_ARTICLE_STARTED 
                });
                expect(store.getActions()[1]).toEqual({ 
                    type: REPORT_ARTICLE_SUCCEDED,
                    message: 'Article has been reported'
                });
            });
    });

    it('reportArticle dispatches reportArticleFailed on failed article report', () => {
        axios.post.mockRejectedValue({});
        const payload = { token: 'dsf', data: {}, push: jest.fn(), slug: "ds" };
        return store
            .dispatch(reportArticle(payload))
            .then(() => {
                expect(store.getActions()[0]).toEqual({ 
                    type: REPORT_ARTICLE_STARTED 
                });
                expect(store.getActions()[1]).toEqual({ 
                    type: REPORT_ARTICLE_FAILED,
                    errorMsg: 'Something went wrong, please check your internet connection'
                });
            });
    });
});
