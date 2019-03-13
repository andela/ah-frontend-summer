/* eslint-disable react/destructuring-assignment */
import  React, { Component } from 'react';
import propTypes from 'prop-types';
import Navbar from '../../components/Navbar';

class Layout extends Component {
    render() {
        const { children } = this.props;
        return (
            <div>
                <Navbar />
                {children}
            </div>
        );
    }
}

Layout.propTypes = {
    children: propTypes.node.isRequired
};

export default Layout;
