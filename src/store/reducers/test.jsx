import articlesReducer, {defaultState} from "./ArticlesReducer";
import { FETCH_ARTICLES_ACTION } from "../actions/async/ArticleActions";
import {ENDED, FAILED, STARTED, SUCCEEDED} from "../actions/async";

const successAction = {
    type: FETCH_ARTICLES_ACTION,
    payload: {
        data:{
            articles: {
                results:{}
            }
        },
        message: "error"
    }
};

describe('Article Reducer Tests', () => {
    it('returns the right default state', () => {
        expect(articlesReducer()).toEqual(defaultState);
    });

    it('returns right state after action successful', () => {
        const state = articlesReducer(defaultState,{
            type: successAction.type + SUCCEEDED,
            payload: successAction.payload
        });
        expect(state.status).toEqual("succeeded");
    });

    it('returns right state after action failed', () => {
        const state = articlesReducer(defaultState,{
            type: successAction.type + FAILED,
            payload: successAction.payload
        });
        expect(state.status).toEqual("failed");
        expect(state.errors).toBeTruthy();
    });

    it('returns right state while loading', () => {
        const state = articlesReducer(defaultState,{
            type: successAction.type + STARTED,
            payload: successAction.payload
        });
        expect(state.loading).toBeTruthy();
        expect(state.status).toEqual("started");
    });

    it('returns right state after action is ended', () => {
        const state = articlesReducer(defaultState,{
            type: successAction.type + ENDED,
            payload: successAction.payload
        });
        expect(state.loading).toBeFalsy();
    });
});
