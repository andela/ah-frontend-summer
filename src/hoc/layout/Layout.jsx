/* eslint-disable react/destructuring-assignment */
import  React, { Component } from 'react';
import propTypes from 'prop-types';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

class Layout extends Component {
    render() {
        const { children } = this.props;
        return (
            <div>
                <Navbar />
                <div className="content-wrapper">
                    {children}
                </div>
                <Footer />
            </div>
        );
    }
}

Layout.propTypes = {
    children: propTypes.node.isRequired
};

export default Layout;
