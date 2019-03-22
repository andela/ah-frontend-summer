import React from "react";
import { shallow } from "enzyme";
import { UserProfile } from "./UserProfile";

describe("UserProfile", () => {
    const profileProps = {
        profileState: {
            profile: { username: "" }, 
            profileLoading: false, 
            profileUpdateMessage: ""
        },
        articlesState: {
            articles: [],
            articlesLoading: false
        },
        onDismissHandler: jest.fn()
    };
    const userProfile = shallow(<UserProfile {...profileProps}/>);

    it("renders correctly", () => {
        expect(userProfile).toMatchSnapshot();
    });
});
