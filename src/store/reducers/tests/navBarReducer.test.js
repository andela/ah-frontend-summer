import navBarReducer from '../navBarReducer';

describe('NavbarReducer test', () => {
    test('should set default state', () => {
        const defaultState = {
            isLoggedIn: false
        };
        const state = navBarReducer(defaultState, { type: "@@INIT" });
        expect(state).toEqual(defaultState);
    });

    test('should change state', () => {
        const newState = {
            isLoggedIn: true
        };
        const state = navBarReducer(newState, { type: "USER_LOGGEDIN" });
        expect(state).toEqual(newState);
    });
});
