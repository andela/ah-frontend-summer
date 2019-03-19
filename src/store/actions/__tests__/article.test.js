import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import { deleteArticle, getArticle, createArticle, updateArticle } from '../article';
import * as actionTypes from '../actionTypes';

describe('testing create article', () => {

	it('tests article creation succeeds', () => {
		const mockStore = configureMockStore([thunk]);
		const store = mockStore({});
		axios.post.mockResolvedValue({ data: {} });

		const expectedAction = [
			{ type: actionTypes.GET_ARTICLE_START },
			{ type: actionTypes.CREATE_ARTICLE_SUCCESS, data: {} },
			{ type: actionTypes.ACTION_ENDED }
		];

		return store.dispatch(createArticle({})).then(() => {
			expect(store.getActions()).toEqual(expectedAction);
		});
	});

	it('tests article creation fails', () => {
		const mockStore = configureMockStore([thunk]);
		const store = mockStore({});

		axios.post.mockRejectedValue({ response: { data: {} } });

		const expectedAction = [{ type: actionTypes.GET_ARTICLE_START },
			{ type: actionTypes.CREATE_ARTICLE_FAIL,
			error: {}
		}];
		return store.dispatch(createArticle({})).then(() => {
			expect(store.getActions()).toEqual(expectedAction);
		});
	});
});

describe('testing retreiving single article', () => {

	it('tests retrieve single article succeeds', () => {
		const mockStore = configureMockStore([thunk]);
		const store = mockStore({});
		axios.get.mockResolvedValue({ data: {} });

		const expectedAction = [{ type: actionTypes.GET_ARTICLE_START },
			{ type: actionTypes.GET_ARTICLE_SUCCESS, data: {} }];

		return store.dispatch(getArticle({})).then(() => {
			expect(store.getActions()).toEqual(expectedAction);
		});
	});

	it('tests retrieve single article fails', () => {
		const mockStore = configureMockStore([thunk]);
		const store = mockStore({});

		axios.get.mockRejectedValue({ response: { data: {} } });

		const expectedAction = [
			{ type: actionTypes.GET_ARTICLE_START },
			{ type: actionTypes.GET_ARTICLE_FAIL, error: {} },
			{ type: actionTypes.ACTION_ENDED }
		];
		return store.dispatch(getArticle({})).then(() => {
			expect(store.getActions()).toEqual(expectedAction);
		});
	});
});

describe('testing delete article', () => {

	it('tests delete article succeeds', () => {
		const mockStore = configureMockStore([thunk]);
		const store = mockStore({});
		axios.delete.mockResolvedValue({ data: {} });

		const expectedAction = [
            { type: actionTypes.GET_ARTICLE_START },
            { type: actionTypes.DELETE_ARTICLE, data: {} },
            { type: actionTypes.ACTION_ENDED }
        ];

		return store.dispatch(deleteArticle({})).then(() => {
			expect(store.getActions()).toEqual(expectedAction);
		});
	});

	it('tests delete article fails', () => {
		const mockStore = configureMockStore([thunk]);
		const store = mockStore({});

		axios.delete.mockRejectedValue({ response: { data: {} } });

		const expectedAction = [
            { type: actionTypes.GET_ARTICLE_START },
            { type: actionTypes.DELETE_ARTICLE_FAIL, error: {}}
        ];
		return store.dispatch(deleteArticle({})).then(() => {
			expect(store.getActions()).toEqual(expectedAction);
		});
	});
});

describe('testing update article', () => {

	it('tests delete article succeeds', () => {
		const mockStore = configureMockStore([thunk]);
		const store = mockStore({});
		axios.patch.mockResolvedValue({ data: {} });

		const expectedAction = [
            { type: actionTypes.GET_ARTICLE_START },
            { type: actionTypes.UPDATE_ARTICLE_SUCCESS, data: {} }
        ];

		return store.dispatch(updateArticle({})).then(() => {
			expect(store.getActions()).toEqual(expectedAction);
		});
	});

	it('tests delete article fails', () => {
		const mockStore = configureMockStore([thunk]);
		const store = mockStore({});

		axios.patch.mockRejectedValue({ response: { data: {} } });

		const expectedAction = [
            { type: actionTypes.GET_ARTICLE_START },
            { type: actionTypes.UPDATE_ARTICLE_FAIL, error: {}}
        ];
		return store.dispatch(updateArticle({})).then(() => {
			expect(store.getActions()).toEqual(expectedAction);
		});
	});
});
