import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Banner from "../components/UI/Banner";


export class BannerContainer extends Component{
    render() {
        const {loggedIn} = this.props;
        return(
            <div>
                {loggedIn ? '' : <Banner />}
            </div>
        );
    }
}

BannerContainer.propTypes = {
    loggedIn: PropTypes.bool
};

BannerContainer.defaultProps = {
    loggedIn: false
};

const mapStateToProps = (state) => {
    return {
        loggedIn: state.auth.loggedIn
    };
};

export default connect(mapStateToProps)(BannerContainer);
