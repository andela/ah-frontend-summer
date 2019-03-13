import * as actionTypes from '../actionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import {
	registerUser,
	verifyUserAccount
} from '../auth';

describe('testing auth user registration', () => {

	it('tests user registration succeeds', () => {
		const mockStore = configureMockStore([thunk]);
		const store = mockStore({});
		axios.post.mockResolvedValue({
			data: {}
		});

		const expectedAction = [{
			type: actionTypes.SIGNUP_USER_STARTED
		}, {
			type: actionTypes.SIGNUP_USER_SUCCEEDED,
			data: {}
		}];

		return store.dispatch(registerUser({})).then(() => {
			expect(store.getActions()).toEqual(expectedAction)
		});
	});

	it('user registration fails', () => {
		const mockStore = configureMockStore([thunk]);
		const store = mockStore({});

		axios.post.mockRejectedValue({
			response: {
				data: {}
			}
		});

		const expectedAction = [{
			type: actionTypes.SIGNUP_USER_STARTED
		}, {
			type: actionTypes.SIGNUP_USER_FAILED,
			error: {}
		}];
		return store.dispatch(registerUser({})).then(() => {
			expect(store.getActions()).toEqual(expectedAction)
		});
	});
});

describe('testing user account verification', () => {

	it('tests user verification succeeds', () => {
		const mockStore = configureMockStore([thunk]);
		const store = mockStore({});
		axios.get.mockResolvedValue({
			data: {}
		});

		const expectedAction = [{
			type: actionTypes.VERIFY_USER_ACCOUNT_STARTED
		}, {
			type: actionTypes.VERIFY_USER_ACCOUNT_SUCCEDED,
			data: {}
		}];
		return store.dispatch(verifyUserAccount({})).then(() => {
			expect(store.getActions()).toEqual(expectedAction)
		});
	});

	it('user verification fails', () => {
		const mockStore = configureMockStore([thunk])
		const store = mockStore({})

		axios.get.mockRejectedValue({
			response: {
				data: {}
			}
		});

		const expectedAction = [{
			type: actionTypes.VERIFY_USER_ACCOUNT_STARTED
		}, {
			type: actionTypes.VERIFY_USER_ACCOUNT_FAIL,
			error: {}
		}];
		return store.dispatch(verifyUserAccount({})).then(() => {
			expect(store.getActions()).toEqual(expectedAction)
		});
	});
});
