import { 
    REPORT_ARTICLE_STARTED, 
    REPORT_ARTICLE_SUCCEDED, 
    REPORT_ARTICLE_FAILED,
    DISMISS_MESSAGE
} from "../actionTypes";

export const reportArticleStarted = () => {
    return {
        type: REPORT_ARTICLE_STARTED
    };
};

export const reportArticleSucceded = message => {
    return {
        type: REPORT_ARTICLE_SUCCEDED,
        message
    };
};

export const reportArticleFailed = errorMsg => {
    return {
        type: REPORT_ARTICLE_FAILED,
        errorMsg
    };
};

export const dismissMessage = () => {
    return {
        type: DISMISS_MESSAGE
    };
};
