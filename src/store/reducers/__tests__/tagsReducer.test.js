import tagsReducer, {defaultState} from "../TagsReducer";
import { FETCH_TAGS_ACTION } from '../../actions/actionTypes';
import {ENDED, FAILED, STARTED, SUCCEEDED} from "../../actions/async";

const successAction = {
    type: FETCH_TAGS_ACTION,
    payload: {
        data:{
            tags: []
        },
        message: "error"
    }
};

describe('Tags Reducer Tests', () => {
    it('returns the right default state', () => {
        expect(tagsReducer()).toEqual(defaultState);
    });

    it('returns right state while loading', () => {
        const state = tagsReducer(defaultState,{
            type: successAction.type + STARTED,
            payload: successAction.payload
        });
        expect(state.status).toEqual(STARTED);
    });

    it('returns right state after successful action', () => {
        const state = tagsReducer(defaultState,{
            type: successAction.type + SUCCEEDED,
            payload: successAction.payload
        });
        expect(state.status).toEqual(SUCCEEDED);
    });

    it('returns right state after failed action', () => {
        const state = tagsReducer(defaultState,{
            type: successAction.type + FAILED,
            payload: successAction.payload
        });
        expect(state.status).toEqual(FAILED);
    });

    it('returns right state with action ended', () => {
        const state = tagsReducer(defaultState,{
            type: successAction.type + ENDED,
            payload: successAction.payload
        });
        expect(state.loading).toBeFalsy();
    });
});
