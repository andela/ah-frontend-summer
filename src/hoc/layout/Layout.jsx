/* eslint-disable react/destructuring-assignment */
import  React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

class Layout extends Component {
    render() {
        const { children } = this.props;
        return (
            <div>
                <Navbar 
                    isLoggedIn={this.props.isAuthenticated}
                />
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

const mapStateToProps = state => {
    return {
        isAuthenticated: state.login.token !== null
    }
}

export default connect(mapStateToProps)(Layout);
