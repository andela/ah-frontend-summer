/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { connect } from 'react-redux';
import { Menu, Button, Image, Icon, Dropdown } from "semantic-ui-react";
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import lifecycle from 'react-pure-lifecycle';
import "../styles/navbar.css";
import branding from '../assets/images/branding.png';
import { fetchUserProfile } from "../store/actions/async/profiles";

const componentDidMount = ({ fetchUserProfile }) => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    fetchUserProfile({ username, token });
};

const methods = {
    componentDidMount
};

export const Navbar = ({ profile }) => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const trigger = (
        <span>
            <Image avatar src={profile.image} />
        </span>
    );
    const options = [
        { key: 'new-article', text: 'New Article', icon: 'compose', as: Link, to: `/articles/create` },
        { key: 'bookmark', text: 'Bookmarks', icon: 'bookmark', as: Link, to: `/articles/bookmarks` },
        { key: 'profile', text: 'Profile', icon: 'user', as: Link, to: `/${username}` },
        { key: 'sign-out', text: 'Sign out', icon: 'sign out', as: Link, to: `#` },
    ];
    return (
        <div>
            <Menu secondary className="mainMenu">
                <Menu.Item header>
                    <NavLink to="/">
                        <Image
                            src={branding}
                        />
                    </NavLink>
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item name="menu" className="navHome">
                        <NavLink to="/">
                            Home
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item name="tags" className="navTags">
                        <NavLink to="/tags">
                            Tags
                        </NavLink>
                    </Menu.Item>
                    { token !== null ? (
                        <Menu.Menu position="right">
                            <NavLink to="/notifications">
                                <Icon size="large" name="bell outline" className="bellNotification" />
                            </NavLink>
                            <Dropdown trigger={trigger} options={options} icon={null} />
                        </Menu.Menu>
                    ) : (
                        <Menu.Menu position="right">
                            <Menu.Item name="signIn" className="navItems">
                                <NavLink to="/login">
                                    Sign in
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item>
                                <NavLink to="/signup">
                                    <Button basic color="teal" className="getStartedBtn">
                                        Get Started
                                    </Button>
                                </NavLink>
                            </Menu.Item>
                        </Menu.Menu>
                    )}
                </Menu.Menu>
            </Menu>
        </div>
    );
};

const mapStateToProps = (state) => {
    return { 
        profile: state.profile.profile
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserProfile: payload => dispatch(fetchUserProfile(payload))
    }
}

Navbar.propTypes = {
    profile: PropTypes.object.isRequired
}


export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(methods)(Navbar));
