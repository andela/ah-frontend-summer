import React from 'react';
import { shallow } from 'enzyme';

import { UpdateArticle, mapDispatchToProps, mapStateToProps } from '../UpdateArticle';

describe('tests UpdateArticle Container', () => {
    const push = jest.fn();
    const props = {
        history: { push },
        loading: false,
        article: {
            title: "title",
            description: "description",
            body: "body"
        },
        message: "",
        onUpdateArticle: jest.fn(),
        match: {
            params: { slug : "article-slug"}
        }
    };
    
    let wrapper = shallow(<UpdateArticle {...props} />);
    let instance = wrapper.instance();

    it('should redirect if user successfully updates their article', () => {
        instance.updateArticleHandler();
        expect(push).toHaveBeenCalled();
    });

    it('should update body value in state is user supplies body in bodyEditor field', () => {
        wrapper.setProps({ article:null });
        let editor = {getData: jest.fn()};
        let event = null;
        instance.bodyChangedHandler(event, editor);
        expect(instance.state.articleData.body).toEqual(undefined);
    });

    it('should update title value in state if user supplies title', () => {
        const e = {
            target: {
                value: "title",
                name: "title"
            }, preventDefault: () => { } };
        instance.inputHandler(e);
        expect(instance.state.articleData.title).toEqual('title');
    });

    it('should update description value in state if user supplies description', () => {
        const e = {
            target: {
                value: "description",
                name: "description"
            }, preventDefault: () => { } };
        instance.inputHandler(e);
        expect(instance.state.articleData.description).toEqual('description');
    });

    it('should map state to props', () => {
        const article = { loading: true, article: "articles"};
        expect(mapStateToProps({ article })).toEqual({
            "loading": true, 
            "article": "articles"
        });
    });

    it('should dispatch state to props', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).onUpdateArticle();
        expect(dispatch.mock.calls.length).toBe(1);
    });
});
