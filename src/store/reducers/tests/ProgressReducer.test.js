import progressReducer, {defaultState} from "../ProgressReducer";
import {ENDED, STARTED, SUCCEEDED} from "../../actions/async";
import {BOOKMARK} from "../../actions/async/ArticleActions";

describe('Progress Reducer Tests', () => {
    it('returns the right default state', () => {
        expect(progressReducer()).toEqual(defaultState);
    });

    describe('bookmark progress tests', () => {
        it('correctly sets the loading status on start action', () => {
            expect(progressReducer({
                bookmark: {
                    loading: false,
                    status: SUCCEEDED
                }},
            {type: BOOKMARK + STARTED})).toEqual({
                bookmark: {
                    loading: true,
                    status: STARTED
                }
            });
        });

        it('correctly sets the loading status and does not change the progress status on end action', () => {
            expect(progressReducer({
                bookmark: {
                    loading: true,
                    status: STARTED
                }},
            {type: BOOKMARK + ENDED})).toEqual({
                bookmark: {
                    loading: false,
                    status: STARTED
                }
            });
        });
    });
});
