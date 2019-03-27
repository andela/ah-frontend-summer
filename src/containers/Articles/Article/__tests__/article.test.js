import React from 'react';
import { shallow } from 'enzyme';

import { Article, mapDispatchToProps, mapStateToProps } from '../Article';
import Loader from '../../../../components/UI/Loader';

describe('tests Article View', () => {
    const push = jest.fn();
    const props = {
        onGetArticle: jest.fn(),
        history: { push },
        loading: false,
        article: null,
        match: {
            params: { slug: "article-slug" }
        },
        onDeleteArticle: jest.fn(),
        error: null
    };
    let article = {
        title: 'article',
        created_at: "732i489",
        author: { username: "fahdjamy" },
        body: "body",
        share_links: {
            facebook: "./foo",
            twitter: "./foo",
            email: "mailto:"
        }


    };
    let wrapper = shallow(<Article {...props} />);
    let instance = wrapper.instance();

    it('should display an article if article prop is not null', () => {
        wrapper.setProps({ article: article });
        expect(instance.renderArticle).not.toEqual(<Loader />);
    });

    it('should update showModal value in state to true if user showModalHandeler is called', () => {
        instance.showModalHandeler();
        expect(instance.state.showModal).toBeTruthy();
    });

    it('should update showModal value in state to false if user closeModalHandler is called', () => {
        instance.closeModalHandler();
        expect(instance.state.showModal).not.toBeTruthy();
    });

    it('should update the renderArticle value to redirect if user deletes their article', () => {
        wrapper.setProps({ article: { article: "Article has been deleted" } });
        expect(instance.renderArticle).not.toEqual(<Loader />);
    });

    it('should redirect user to landing page if slug doesnot exist', () => {
        wrapper.setProps({ error: { article: { errors: 'wrong slug' } } });
        expect(instance.renderArticle).not.toEqual(<Loader />);
    });

    it('should map state to props', () => {
        const article = { loading: true, article: "articles" };
        expect(mapStateToProps({ article })).toEqual({ "loading": true, "article": "articles" });
    });

    it('should dispatch state to props', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).onDeleteArticle();
        mapDispatchToProps(dispatch).onGetArticle();
        expect(dispatch.mock.calls.length).toBe(2);
    });
});
