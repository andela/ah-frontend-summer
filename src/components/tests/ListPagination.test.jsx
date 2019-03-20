import React from 'react';
import { shallow } from 'enzyme';
import ListPagination from '../article/ListPagination';

let onPageChange, fetchArticles, articleCount, wrapper;

beforeEach(() => {
    onPageChange = jest.fn();
    fetchArticles = jest.fn();
    articleCount = 20;
    wrapper = shallow(
        <ListPagination
            onPageChange={onPageChange}
            fetchArticles={fetchArticles}
            articleCount={articleCount}
        />
    );
});

describe('ListPagination tests', () => {
    it('should render ListPagination correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should handle page change', () => {
        const event = null;
        const data = {};
        wrapper.find('Pagination').prop('onPageChange')(event, data);
        expect(fetchArticles).toHaveBeenCalled();
    });

    it('should set local storage', () => {
        const localStorage = {};
        localStorage.getItem = jest.fn().mockImplementation(() => { return 2;});
        expect(ListPagination.currentLocalStorage(localStorage)).toBe(2);
        expect(localStorage.getItem).toHaveBeenCalled();
        expect(localStorage.getItem.mock.calls.length).toBe(1);
    });
});
