import React from 'react';
import { shallow } from 'enzyme';
import { FollowersFollowing, mapDispatchToProps } from './FollowersFollowing';

describe("FollowersFollowing", () => {
    const fetchUserProfileMock = jest.fn();
    const userProfileProps = {
        fetchUserProfile: fetchUserProfileMock,
        match: { params: { username: "" }},
        location: { pathname: "" },
        profile: {},
    };
    const followersFollowing = shallow(<FollowersFollowing {...userProfileProps}/>);
    const followersFollowingInstance = followersFollowing.instance();

    it("renders correctly", () => {
        expect(followersFollowing).toMatchSnapshot();
    });
    
    it("componentDidMount calls dispatches actions to fetch user profile", () => {
        followersFollowingInstance.componentDidMount();
        expect(fetchUserProfileMock).toHaveBeenCalled();
    });

    it("mapDispatchToProps", () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).fetchUserProfile();
        expect(dispatch.mock.calls.length).toBe(1);
    });
});
