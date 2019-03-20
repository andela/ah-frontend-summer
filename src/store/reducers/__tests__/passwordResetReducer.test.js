import passwordResetReducer, { defaultState } from "../passwordResetReducer";
import { REQUEST_PASSWORD_RESET, RESET_PASSWORD } from "../../actions/async/passwordResetActions";
import {ENDED, FAILED, STARTED, SUCCEEDED} from "../../actions/async";

describe('Password Reset Reducer Tests', () => {
    it('returns the right default state', () => {
        expect(passwordResetReducer()).toEqual(defaultState);
    });

    it('returns the right state when request action is started', () => {
        const state = passwordResetReducer(defaultState, {
            type: REQUEST_PASSWORD_RESET + STARTED,
        });
        expect(state.loading).toBeTruthy();
    });

    it('returns the right state when request action is successful', () => {
        const state = passwordResetReducer(defaultState, {
            type: REQUEST_PASSWORD_RESET + SUCCEEDED,
            payload: {data: {user:{message: 'success'}}}
        });
        expect(state.msgDisplayed).toBeFalsy();
    });

    it('returns the right state when request action is unsuccessful', () => {
        const state = passwordResetReducer(defaultState, {
            type: REQUEST_PASSWORD_RESET + FAILED,
            payload: {response: {data: 'error'}}
        });
        expect(state.msgDisplayed).toBeTruthy();
    });

    it('returns the right state when request action is ended', () => {
        const state = passwordResetReducer(defaultState, {
            type: REQUEST_PASSWORD_RESET + ENDED
        });
        expect(state.loading).toBeFalsy();
    });

    it('returns the right state when password reset is started', () => {
        const state = passwordResetReducer(defaultState, {
            type: RESET_PASSWORD + STARTED,
        });
        expect(state.loading).toBeTruthy();
    });

    it('returns the right state when password reset successful', () => {
        const state = passwordResetReducer(defaultState, {
            type: RESET_PASSWORD + SUCCEEDED,
            payload: {data: {user:{message: 'success'}}}
        });
        expect(state.msgDisplayed).toBeFalsy();
    });

    it('returns the right state when password reset unsuccessful', () => {
        const state = passwordResetReducer(defaultState, {
            type: RESET_PASSWORD + FAILED,
            payload: {response: {data: 'error'}}
        });
        expect(state.msgDisplayed).toBeTruthy();
    });

    it('returns the right state when password reset ended', () => {
        const state = passwordResetReducer(defaultState, {
            type: RESET_PASSWORD + ENDED
        });
        expect(state.loading).toBeFalsy();
    });

});
