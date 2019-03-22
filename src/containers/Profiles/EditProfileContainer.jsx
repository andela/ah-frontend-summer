import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { 
    fetchUserProfile, 
    requestEditProfile 
} from '../../store/actions/async/profiles';
import EditProfile from '../../components/Profiles/EditProfile';
import { dismissMessage } from '../../store/actions/sync/profiles';

export class EditProfileContainer extends Component {
    state = {
        firstName: "",
        lastName: "",
        bio: "",
        image: null,
        disabled: true
    };

    componentDidMount = () => {
        const { match: { params: {username} } = { params: {} } } = this.props;
        const token = localStorage.getItem("token");
        this.props.fetchUserProfile({ username, token });
    };

    UNSAFE_componentWillReceiveProps = (nextProps, nextState) => {
        const { first_name, last_name, bio, image } = nextProps.profile;
        const firstName = !first_name ? "" : first_name;
        const lastName = !last_name ? "" : last_name;
        const bioString = !bio ? "" : bio;
        this.setState({ firstName, lastName, bio: bioString, image });
    };

    onChangeHandler = e => { 
        const { firstName, lastName, bio, image } = this.state;
        const disabled = !firstName && !lastName && !bio && !image ? true : false;
        this.setState({ [e.target.name]: e.target.value, disabled });
    };

    imageHandler = e => this.setState({ image: e.target.files[0], disabled: false });

    onSubmitHandler = e => {
        e.preventDefault();
        const { username } = this.props.match.params;
        const token = localStorage.getItem("token");
        const { firstName, lastName, bio, image } = this.state;
        const userData = { first_name: firstName, last_name: lastName, bio, image };
        const history = this.props.history;
        const payload = { username, token, history, data: userData };
        this.props.requestEditProfile(payload);
    };

    onDismissHandler = () => {
        this.props.dismissMessage();
    };

    render() {
        const editProfileProps = {
            ...this.state,
            onChangeHandler: this.onChangeHandler,
            imageHandler: this.imageHandler,
            onSubmitHandler: this.onSubmitHandler,
            onDismissHandler: this.onDismissHandler,
            ...this.props
        };

        return <EditProfile {...editProfileProps} />;
    }
}

const mapStateToProps = state => {
    return {
        profile: state.profile.profile,
        profileLoading: state.profile.loading,
        loadingEditButton: state.profile.loadingEditButton,
        profileUpdateMessage: state.profile.profileUpdateMessage
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        fetchUserProfile: payload => dispatch(fetchUserProfile(payload)),
        requestEditProfile: payload => dispatch(requestEditProfile(payload)),
        dismissMessage: () => dispatch(dismissMessage())
    };
};

EditProfileContainer.propTypes = {
    fetchUserProfile: PropTypes.func.isRequired,
    requestEditProfile: PropTypes.func.isRequired,
    dismissMessage: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    profileLoading: PropTypes.bool.isRequired,
    loadingEditButton: PropTypes.bool.isRequired,
    profileUpdateMessage: PropTypes.string.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileContainer);
