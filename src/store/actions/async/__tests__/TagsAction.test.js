import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import axios from 'axios';
import {ENDED, FAILED, STARTED, SUCCEEDED} from "../index";
import fetchTagsAction from "../TagsActions";
import { FETCH_TAGS_ACTION } from '../../actionTypes';

jest.mock('axios');

const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = mockStore({});

describe("TagsActions Tests", () => {
    beforeEach(() => {
        store.clearActions();
    });

    it("dispatches correct action on success", (done) => {
        axios.get.mockResolvedValue();
        store.dispatch(fetchTagsAction()).then(() => {
            const actions = store.getActions();
            expect(actions).toHaveLength(3); 
            expect(actions[0].type).toEqual(FETCH_TAGS_ACTION + STARTED);
            expect(actions[1].type).toEqual(FETCH_TAGS_ACTION + SUCCEEDED);
            expect(actions[2].type).toEqual(FETCH_TAGS_ACTION + ENDED);
            done();
        });
    });

    it("dispatches correct action on failure", (done) => {
        axios.get.mockRejectedValue();
        store.dispatch(fetchTagsAction()).then(() => {
            const actions = store.getActions();
            expect(actions).toHaveLength(3); 
            expect(actions[0].type).toEqual(FETCH_TAGS_ACTION + STARTED);
            expect(actions[1].type).toEqual(FETCH_TAGS_ACTION + FAILED);
            expect(actions[2].type).toEqual(FETCH_TAGS_ACTION + ENDED);
            done();
        });
    });
});
