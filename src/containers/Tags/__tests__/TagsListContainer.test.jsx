import React from 'react';
import { shallow } from 'enzyme';
import { TagsListContainer, mapStateToProps, mapDispatchToProps } from '../TagsListContainer';
import { FAILED, SUCCEEDED } from '../../../store/actions/async';
import TagsList from '../../../components/tags/TagsList';

let fetchTags, handleOnClick, wrapper, status, tags, toRender;

beforeEach(() => {
    fetchTags = jest.fn(),
    handleOnClick = jest.fn(),
    status = SUCCEEDED,
    tags = ["body", "love"];
    toRender = (
        <TagsList
            tags={tags}
            handleOnClick={handleOnClick}
        />
    );
});


describe('TagsListContainer tests', () => {
    let props = {
        status: SUCCEEDED,
        tags: ["body", "love"],
        fetchTagsDispatcher: jest.fn(),
        fetchTagFiltersDispatcher: jest.fn(),
        fetchTagFiltersAction: jest.fn(),
        fetchTagsAction: jest.fn()
    };
    wrapper = shallow(<TagsListContainer {...props} />);

    it('should render TagsListContainer correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should call fetchTagsDispatcher correctly', () => {
        wrapper.instance().fetchTags;
        expect(props.fetchTagsDispatcher).toBeCalled();
    });

    it('should call fetchTags when status is Failed', () => {
        status = FAILED;
        wrapper.setProps({ status });
        expect(props.fetchTagsDispatcher).toBeCalled();
    });

    it('should map state to props', () => {
        let newState = { tags : { tags, status } };
        expect(mapStateToProps( newState )).toEqual({tags, status});
    });

    it('should map dispatch to props', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).fetchTagsDispatcher();
        expect(dispatch.mock.calls.length).toBe(1);
    });

});
