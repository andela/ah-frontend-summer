/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu, Button, Image, Icon } from "semantic-ui-react";
import "../styles/navbar.css";
import branding from '../assets/images/branding.png';

export const Navbar = (props) => {
    const { navBar } = props;
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
                    <Menu.Item name="menu" className="navItems">
                        <NavLink to="/">
                            Home
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item name="tags" className="navItems">
                        <NavLink to="/">
                            Tags
                        </NavLink>
                    </Menu.Item>
                    {navBar.isLoggedIn ? (
                        <Menu.Menu position="right">
                            <NavLink to="/notifications">
                                <Icon size="large" name="bell outline" className="bellNotification" />
                            </NavLink>
                            <NavLink to="/profile">
                                <Icon size="big" name="user circle" className="avatar" />
                            </NavLink>
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
    return { navBar: state.navBar };
};

Navbar.propTypes = {
    navBar: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(Navbar);
