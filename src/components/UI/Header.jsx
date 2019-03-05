import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/index.css';

const Header = () => (
    <div>
        <NavLink to="/" activeClassName="is-active" exact>Home</NavLink>
        &nbsp;
        <NavLink to="/login" activeClassName="is-active">Login</NavLink>
    </div>
);

export default Header;
