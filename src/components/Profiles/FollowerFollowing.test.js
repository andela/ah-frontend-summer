import React from 'react';
import { shallow } from 'enzyme';
import FollowerFollowing from './FollowerFollowing';

describe("Follow Following", () => {
    let props = {
        profile: { followers: [], followings: [] },
        location: { pathname: "" },
        match: { params: { username: ""} }
    };
    let followFollowing = shallow(<FollowerFollowing {...props}/>);

    it("renders correctly", () => {
        expect(followFollowing).toMatchSnapshot();
    });

    it("renders correctly with followers", () => {
        followFollowing = shallow(<FollowerFollowing {...props} />)
        expect(followFollowing).toMatchSnapshot();
    });
});
