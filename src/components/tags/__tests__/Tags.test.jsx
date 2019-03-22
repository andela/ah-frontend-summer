import React from "react";
import { shallow, render, mount } from "enzyme";
import { Link, StaticRouter } from "react-router-dom";
import { Button, Header } from "semantic-ui-react";
import TagCard from "../TagCard";
import TagList from "../TagsList";
import TagError from "../TagsError";

const tag = "club";
const handleOnClick = jest.fn();
const props = {
    tag,
    handleOnClick,
};

describe('Tag Components Tests', () => {
    describe('TagCard', () => {
        it('renders correctly', () => {
            const wrapper = shallow(<TagCard {...props} />);
            expect(wrapper.exists(Link)).toBeTruthy();
            expect(wrapper.exists(Button)).toBeTruthy();
        });
    });

    describe('TagsError', () => {
        it('renders correctly', () => {
            const wrapper = shallow(<TagError retry={jest.fn()} />);
            expect(wrapper.exists(Button)).toBeTruthy();
        });
    });

    describe('TagList', () => {
        it('renders correctly', () => {
            let props = { tags: ['google', 'radear'], handleOnClick: jest.fn() }
            const wrapper = shallow(<TagList {...props} />);
            expect(wrapper.exists(Header)).toBeTruthy();
            expect(wrapper.find('.article-list')).toHaveLength(1);
        });
    });
});
