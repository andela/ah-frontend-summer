import { 
    reportArticleStarted, 
    reportArticleSucceded, 
    reportArticleFailed 
} from "../ReportArticle";
import { 
    REPORT_ARTICLE_STARTED, 
    REPORT_ARTICLE_SUCCEDED, 
    REPORT_ARTICLE_FAILED
} from "../../actionTypes";

describe('Rate article synchrinous actions', () => {
    it('reportArticleStarted creates action REPORT_ARTICLE_STARTED', () => {
        expect(reportArticleStarted()).toEqual({ 
            type: REPORT_ARTICLE_STARTED 
        });
    });

    it('reportArticleSucceded creates action REPORT_ARTICLE_SUCCEDED', () => {
        expect(reportArticleSucceded('')).toEqual({ 
            type: REPORT_ARTICLE_SUCCEDED,
            message: '' 
        });
    });

    it('reportArticleFailed creates action REPORT_ARTICLE_FAILED', () => {
        expect(reportArticleFailed('')).toEqual({ 
            type: REPORT_ARTICLE_FAILED,
            errorMsg: '' 
        });
    });
});
