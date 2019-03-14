import { shallow } from 'enzyme';
import React from "react";
import { BannerContainer } from "../BannerContainer";
import Banner from "../../components/UI/Banner";

describe('Banner Container Tests', () => {
    it('renders a container when the logged in prop is not provided', () => {
        const bannerContainerWrapper = shallow(<BannerContainer />);
        expect(bannerContainerWrapper.find(Banner)).toHaveLength(1);
    });

    it('renders a container when a user not logged in', () => {
        const bannerContainer = shallow(<BannerContainer loggedIn={false} />);
        expect(bannerContainer.find(Banner)).toHaveLength(1);
    });

    it('does not render a container when a user is logged in', () => {
        const bannerContainer = shallow(<BannerContainer loggedIn={true} />);
        expect(bannerContainer.find(Banner)).toHaveLength(0);
    });
});
