import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import axios from 'axios';
import {ENDED, FAILED, FETCH_HOME_PAGE_ACTION, fetchHomePageAction, STARTED, SUCCEEDED} from "./index";
import {FETCH_ARTICLES_ACTION, fetchArticlesAction} from "./ArticleActions";

jest.mock('axios');

const middleware = [thunk];
const mockStore = configureStore(middleware);
const store = mockStore({});

describe("Article Actions Tests", () => {
    it("dispatches correct action on successful response", (done) => {
        axios.get.mockResolvedValue({
            data: {
                articles: {
                    results: []
                }
            }
        }
        );
        // dispatch async action
        store.dispatch(fetchArticlesAction()).then(() => {
            const actions = store.getActions();
            expect(actions).toHaveLength(3); // 3 actions have been dispatched to the store started, succeeded, ended
            expect(actions[0].type).toEqual(FETCH_ARTICLES_ACTION + STARTED);
            expect(actions[1].type).toEqual(FETCH_ARTICLES_ACTION + SUCCEEDED);
            expect(actions[2].type).toEqual(FETCH_ARTICLES_ACTION + ENDED);
            done();
        });
    });

    it("dispatches correct action on failure", (done) => {
        axios.get.mockRejectedValue({
            response: {
                status: 400
            }
        });

        // dispatch async action
        store.dispatch(fetchArticlesAction()).then(() => {
            const actions = store.getActions();
            expect(actions).toHaveLength(3); // 3 actions have been dispatched to the store started, succeeded, ended
            expect(actions[0].type).toEqual(FETCH_ARTICLES_ACTION + STARTED);
            expect(actions[1].type).toEqual(FETCH_ARTICLES_ACTION + FAILED);
            expect(actions[2].type).toEqual(FETCH_ARTICLES_ACTION + ENDED);
            done();
        });
    });
});
