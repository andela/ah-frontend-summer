import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUserProfile } from '../../store/actions/async/profiles';
import FollowerFollowing from '../../components/Profiles/FollowerFollowing';
import PropTypes from 'prop-types';

export class FollowersFollowing extends Component {
    componentDidMount = () => {
        const { 
            match: { params: { username } } = { params: {} }, 
            fetchUserProfile 
        } = this.props;
        const token = localStorage.getItem("token");
        fetchUserProfile({ username, token });
    };

    render() {
        return <FollowerFollowing {...this.props} />;
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profile.profile
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        fetchUserProfile: payload => dispatch(fetchUserProfile(payload))
    };
};

FollowersFollowing.propTypes = {
    fetchUserProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(FollowersFollowing);
