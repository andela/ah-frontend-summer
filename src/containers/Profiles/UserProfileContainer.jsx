import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUserProfile } from '../../store/actions/async/profiles';
import { fetchArticlesAction } from '../../store/actions/async/ArticleActions';
import UserProfile from '../../components/Profiles/UserProfile';
import { dismissMessage } from '../../store/actions/sync/profiles';

export class UserProfileContainer extends Component {
    fetchProfile = () => {
        const { 
            match: { params: { username } } = { params: {} },
            fetchUserProfile,
            fetchUserArticles 
        } = this.props;
        const token = localStorage.getItem("token");
        const url = `https://ah-backend-summer-staging.herokuapp.com/api/v1/articles/?author=${username}`;
        fetchUserProfile({ username, token });
        fetchUserArticles(url);
    };

    componentDidMount = () => {
        this.fetchProfile();
    };

    componentDidUpdate = prevProps => {
        if(this.props.profile.username !== this.props.match.params.username){
            this.fetchProfile();
        }
    };

    onDismissHandler = () => {
        this.props.dismissMessage();
    };

    render() {
        return (
            <UserProfile {...this.props} onDismissHandler={this.onDismissHandler} />
        );
    }
}

export const mapStateToProps = state => {
    return {
        profile: state.profile.profile
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        fetchUserProfile: payload => dispatch(fetchUserProfile(payload)),
        fetchUserArticles: url => dispatch(fetchArticlesAction(url)),
        dismissMessage: () => dispatch(dismissMessage())
    };
};

UserProfileContainer.propTypes = {
    profile: PropTypes.object.isRequired,
    fetchUserProfile: PropTypes.func.isRequired,
    fetchUserArticles: PropTypes.func.isRequired,
    dismissMessage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileContainer);
