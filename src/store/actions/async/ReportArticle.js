import axios from 'axios';
import { 
    reportArticleStarted, 
    reportArticleSucceded, 
    reportArticleFailed
} from '../sync/ReportArticle';

export const reportArticle = payload => {
    return async dispatch => {
        dispatch(reportArticleStarted());
        const { token, data, slug, push } = payload;
        try {
            await axios.post(
                `https://ah-backend-summer-staging.herokuapp.com/api/v1/articles/${slug}/report`,
                data,
                { headers: { Authorization: `Bearer ${token}` }}
            );
            dispatch(reportArticleSucceded('Article has been reported'));
            push(`/articles/${slug}`);
        } catch (error) {
            const errorMsg = 'Something went wrong, please check your internet connection';
            dispatch(reportArticleFailed(errorMsg));
        }
    };
};
