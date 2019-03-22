import React from 'react';
import { shallow } from 'enzyme';
import { 
    UserProfileContainer, 
    mapDispatchToProps 
} from './UserProfileContainer';

describe("UserProfile", () => {
    const fetchUserProfileMock = jest.fn();
    const fetchUserArticlesMock = jest.fn();
    const userProfileProps = {
        fetchUserProfile: fetchUserProfileMock,
        fetchUserArticles: fetchUserArticlesMock,
        match: { params: { username: "" }},
        profile: {},
        dismissMessage: jest.fn()
    };
    const userProfileContainer = shallow(<UserProfileContainer {...userProfileProps}/>);
    const userProfileContainerInstance = userProfileContainer.instance();

    it("renders correctly", () => {
        expect(userProfileContainer).toMatchSnapshot();
    });
    
    it("componentDidMount calls dispatches actions to fetch user profile and user articles", () => {
        userProfileContainerInstance.componentDidMount();
        expect(fetchUserProfileMock).toHaveBeenCalled();
        expect(fetchUserArticlesMock).toHaveBeenCalled();
    });

    it("mapDispatchToProps", () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).fetchUserProfile();
        mapDispatchToProps(dispatch).fetchUserArticles();
        mapDispatchToProps(dispatch).dismissMessage();
        expect(dispatch.mock.calls.length).toBe(3);
    });
});
