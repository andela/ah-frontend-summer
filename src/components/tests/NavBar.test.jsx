import React from 'react';
import { shallow } from 'enzyme';
import { Navbar } from '../Navbar';
import navbarState from './fixtures/navBarState';

describe('Navbar test', () => {
    test('should render Navbar with default state', () => {
        const wrapper = shallow(<Navbar 
                                    navBar={navbarState[0]} 
                                    profile={{image: ""}} 
                                    fetchUserProfile={jest.fn()} />);
        expect(wrapper).toMatchSnapshot();
    });

    test('should render Navbar with logged in state', () => {
        const wrapper = shallow(<Navbar 
                                    navBar={navbarState[1]} 
                                    profile={{ image: "" }} 
                                    fetchUserProfile={jest.fn()} 
                                    />);
        expect(wrapper).toMatchSnapshot();
    });
});
