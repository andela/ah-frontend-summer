import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {ENDED, FETCH_HOME_PAGE_ACTION, fetchHomePageAction, STARTED, SUCCEEDED} from './actions/async/index';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('tests', () => {
    afterEach(() => {
        fetch.resetMocks();
    });

    test('dispatching async action dispatches expected actions', (done) => {
        const url = 'https://example.com';
        fetch.mockResponse(JSON.stringify({ data: 'data' }));
        const store = mockStore({});
        // dispatch async action
        store.dispatch(fetchHomePageAction(url)).then(() => {
            const actions = store.getActions();
            expect(actions).toHaveLength(3); // 3 actions have been dispatched to the state started, succeeded, ended
            expect(actions[0].type).toEqual(FETCH_HOME_PAGE_ACTION + STARTED);
            expect(actions[1].type).toEqual(FETCH_HOME_PAGE_ACTION + SUCCEEDED);
            expect(actions[2].type).toEqual(FETCH_HOME_PAGE_ACTION + ENDED);
            done();
        });
    });
});
