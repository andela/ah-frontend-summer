import React from 'react';
import { shallow } from 'enzyme';
import EditProfile from './EditProfile';

describe("EditProfile", () => {
    const editProfileProps = { 
        onSubmitHandler: jest.fn(), 
        profile: {username: "", image: ""}, 
        imageHandler: jest.fn(), 
        onChangeHandler: jest.fn(), 
        firstName: "", 
        lastName: "", 
        bio: "", 
        profileLoading: false, 
        loadingEditButton: false,
        disabled: true
    };
    const editProfile = shallow(<EditProfile {...editProfileProps}/>);
    
    it("renders correctly", () => {
        expect(editProfile).toMatchSnapshot();
    });
});
