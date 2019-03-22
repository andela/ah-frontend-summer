import articlesReducer, {defaultState} from "./ArticlesReducer";
import { FETCH_ARTICLES_ACTION } from "../actions/async/ArticleActions";
import { FETCH_TAG_FILTER_ACTION } from '../actions/actionTypes';
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

const successFilterAction = {
    type: FETCH_TAG_FILTER_ACTION,
    payload: {
        data:{
            articles: {
                results:{}
            }
        },
        message: "error",
        loading: false
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
        expect(state.status).toEqual(SUCCEEDED);
    });

    it('returns right state after action failed', () => {
        const state = articlesReducer(defaultState,{
            type: successAction.type + FAILED,
            payload: successAction.payload
        });
        expect(state.status).toEqual(FAILED);
        expect(state.errors).toBeTruthy();
    });

    it('returns right state while loading', () => {
        const state = articlesReducer(defaultState,{
            type: successAction.type + STARTED,
            payload: successAction.payload
        });
        expect(state.loading).toBeTruthy();
        expect(state.status).toEqual(STARTED);
    });

    it('returns right state after action is ended', () => {
        const state = articlesReducer(defaultState,{
            type: successAction.type + ENDED,
            payload: successAction.payload
        });
        expect(state.loading).toBeFalsy();
    });
});

describe('Article Filter Reducer Tests', () => {
    it('returns right state after action successful', () => {
        const state = articlesReducer(defaultState,{
            type: successFilterAction.type + SUCCEEDED,
            payload: successFilterAction.payload
        });
        expect(state.status).toEqual(SUCCEEDED);
    });

    it('returns right state after action failed', () => {
        const state = articlesReducer(defaultState,{
            type: successFilterAction.type + FAILED,
            payload: successFilterAction.payload
        });
        expect(state.status).toEqual(FAILED);
        expect(state.errors).toBeTruthy();
    });

    it('returns right state while loading', () => {
        const state = articlesReducer(defaultState,{
            type: successFilterAction.type + STARTED,
            payload: successFilterAction.payload
        });
        expect(state.loading).toBeTruthy();
        expect(state.status).toEqual(STARTED);
    });

    it('returns right state after action is ended', () => {
        const state = articlesReducer(defaultState,{
            type: successFilterAction.type + ENDED,
            payload: successFilterAction.payload
        });
        expect(state.loading).toBeFalsy();
    });
});
