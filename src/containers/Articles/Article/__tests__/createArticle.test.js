import React from 'react';
import { shallow } from 'enzyme';

import { CreateArticle, mapDispatchToProps, mapStateToProps } from '../CreateArticle';

describe('tests CreateArticle Container', () => {
    const push = jest.fn();
    const props = {
        history: { push },
        loading: false,
        article: null,
        message: "",
        onCreateArticle: jest.fn()
    };
    
    let wrapper = shallow(<CreateArticle {...props} />);
    let instance = wrapper.instance();

    it('should redirect if user successfully creates an article', () => {
        wrapper.setProps({ message: "Article created successfully"});
        instance.createArticleSubmitHandler();
        expect(instance.createArticle).not.toBeNull();
    });

    it('should update editorState value in state if onChangeHandler is called', () => {
        instance.onChangeHandler();
        expect(instance.state.editorState).not.toBeNull();
    });

    it('should update body value in state is user supplies body in bodyEditor field', () => {
        let editor = {getData: jest.fn()};
        let event = null;
        instance.bodyChangedHandler(event, editor);
        expect(instance.state.articleData.body).toEqual(undefined);
    });

    it('should map state to props', () => {
        const article = { loading: true, article: "articles", message: "created"};
        expect(mapStateToProps({ article })).toEqual({
            "loading": true, 
            "article": "articles",
            "message": "created"
        });
    });

    it('should update title value in state is user supplies title', () => {
        const e = {
            target: {
                value: "title",
                name: "title"
            }, preventDefault: () => { } };
        instance.inputHandler(e);
        expect(instance.state.articleData.title).toEqual('title');
    });

    it('should update description value in state is user supplies description', () => {
        const e = {
            target: {
                value: "description",
                name: "description"
            }, preventDefault: () => { } };
        instance.inputHandler(e);
        expect(instance.state.articleData.description).toEqual('description');
    });

    it('should dispatch state to props', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).onCreateArticle();
        expect(dispatch.mock.calls.length).toBe(1);
    });
});
