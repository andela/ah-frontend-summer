import React from 'react';
import { shallow } from 'enzyme';
import { 
    EditProfileContainer, 
    mapDispatchToProps 
} from './EditProfileContainer';

describe("EditProfileContainer", () => {
    const fetchUserProfileMock = jest.fn();
    const requestEditProfileMock = jest.fn();
    const dismissMessageMock = jest.fn();

    const editProfileProps = {
        profile: {},
        profileLoading: false,
        loadingEditButton: false,
        fetchUserProfile: fetchUserProfileMock,
        requestEditProfile: requestEditProfileMock,
        match: { params: {}},
        dismissMessage: dismissMessageMock,
        profileUpdateMessage: ""
    };
    const editProfileContainer = shallow(<EditProfileContainer 
                                            {...editProfileProps} 
                                            />);
    const editProfileContainerInstance = editProfileContainer.instance();

    afterEach(() => {
        const state = { 
            firstName: "", 
            lastName: "", 
            bio: "", 
            image: null 
        };
        editProfileContainer.setState(state);
    });

    it("renders correctly", () => {
        expect(editProfileContainer).toMatchSnapshot();
    });

    it("componentDidMount dispatches action to fetch profile", () => {
        editProfileContainerInstance.componentDidMount();
        expect(fetchUserProfileMock).toHaveBeenCalled();
    });

    it("onSubmitHandler dispatches action to update profile", () => {
        const event = { preventDefault: jest.fn() };
        editProfileContainerInstance.onSubmitHandler(event);
        expect(requestEditProfileMock).toHaveBeenCalled();
    });

    it("UNSAFE_componentWillReceiveProps updates the local state", () => {
        const profileProps = { 
            profile: { 
                first_name: "okay", 
                last_name: "fine", 
                bio: "yes", 
                image: "nice"
            } 
        };
        editProfileContainerInstance.UNSAFE_componentWillReceiveProps(profileProps, null);
        expect(editProfileContainer.state().firstName).toBe("okay");
        expect(editProfileContainer.state().lastName).toBe("fine");
        expect(editProfileContainer.state().bio).toBe("yes");
        expect(editProfileContainer.state().image).toBe("nice");
    });

    it("imageHandler updates the image in local state", () => {
        const event = { target: { files: ["okay"] } };
        editProfileContainerInstance.imageHandler(event);
        expect(editProfileContainer.state().image).toBe("okay");
    });

    it("onChangeHandler updates field in local state", () => {
        const event = { target: { name: "firstName", value: "nice" } };
        editProfileContainerInstance.onChangeHandler(event);
        expect(editProfileContainer.state().firstName).toBe("nice");
    });

    it("onDismiss dispatches dismissMessage action creator", () => {
        editProfileContainerInstance.onDismissHandler();
        expect(dismissMessageMock).toHaveBeenCalled();
    });

    it("mapDispatchToProps", () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).fetchUserProfile();
        mapDispatchToProps(dispatch).requestEditProfile();
        mapDispatchToProps(dispatch).dismissMessage();
        expect(dispatch.mock.calls.length).toBe(3);
    });
});
