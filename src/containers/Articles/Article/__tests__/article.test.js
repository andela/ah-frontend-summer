import React from 'react';
import { shallow } from 'enzyme';

import { Article, mapDispatchToProps, mapStateToProps } from '../Article';
import Loader from '../../../../components/UI/Loader';
import {BookmarkContainer} from "../Bookmark";

describe('tests Article View', () => {
    const push = jest.fn();
    const onArticleDisliked = jest.fn();
    const onRevertingDislike = jest.fn();
    const onRevertingLike = jest.fn();
    const onArticleLiked = jest.fn();
    const props = {
        onGetArticle: jest.fn(),
        history: { push },
        loading: false,
        article: null,
        match: {
            params: { slug: "article-slug" }
        },
        onDeleteArticle: jest.fn(),
        error: null,
        onArticleLiked: jest.fn(),
        onRevertingLike: jest.fn(),
        onRevertingDislike: jest.fn(),
        onArticleDisliked: jest.fn()
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
        const reportArticle = { message: "" }
        expect(mapStateToProps({ article, reportArticle })).toEqual({
            "loading": true, 
            "article": "articles",
            "message": ""
        });
    });

    it('should redirect users to login page if not authenticated and if likeArticleHandler is called', () => {
        instance.likeArticleHandler();
        expect(push).toHaveBeenCalled();
    });

    it('should redirect users to login page if not authenticated and if dislikeArticleHandler is called', () => {
        instance.dislikeArticleHandler();
        expect(push).toHaveBeenCalled();
    });

    it('should dispatch state to props', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).onDeleteArticle();
        mapDispatchToProps(dispatch).onGetArticle();
        mapDispatchToProps(dispatch).onArticleLiked();
        mapDispatchToProps(dispatch).onRevertingLike();
        mapDispatchToProps(dispatch).onArticleDisliked();
        mapDispatchToProps(dispatch).onRevertingDislike();
        expect(dispatch.mock.calls.length).toBe(6);
    });

    describe('BookmarkContainer Tests', () => {
        let props, wrapper, instance;

        beforeEach(() => {
            props = {
                slug:"testSlug",
                loading:false,
                bookmark:jest.fn(),
                isBookmarked:false,
                undoBookmark: jest.fn()
            };

            wrapper = shallow(<BookmarkContainer {...props} />);
            instance = wrapper.instance();
        });

        it('renders without crashing', () => {
            shallow(<BookmarkContainer {...props} />);
        });

        it('dispatches bookmark when article is not bookmarked', () => {
            expect(props.bookmark).toHaveBeenCalledTimes(0);
            instance.triggerBookmark();
            expect(props.bookmark).toHaveBeenCalledTimes(1);
        });

        it('dispatches undoBookmark when article is bookmarked', () => {
            wrapper.setProps({...props, isBookmarked: true});
            expect(props.undoBookmark).toHaveBeenCalledTimes(0);
            instance.triggerBookmark();
            expect(props.undoBookmark).toHaveBeenCalledTimes(1);
        });

        it('dispatches no action when loading', () => {
            wrapper.setProps({...props, loading: true});
            instance.triggerBookmark();
            wrapper.setProps({...props, loading: true, isBookmarked: true});
            instance.triggerBookmark();
            expect(props.bookmark).toHaveBeenCalledTimes(0);
            expect(props.undoBookmark).toHaveBeenCalledTimes(0);
        });
    });
});
