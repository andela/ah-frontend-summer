import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import Login from "../components/Login";
import loginFetch from "../store/actions/async/login";
import { removeLoginError } from "../store/actions/sync/login";

export class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isEmailValid: true
        };
    }

    onSubmitHandler = e => {
        e.preventDefault();
        this.setState({ isEmailValid: true })
        const { email, password } = this.state;
        const data = { email, password };
        const {
            history,
            login
        } = this.props;
        const url =
        "https://ah-backend-summer-staging.herokuapp.com/api/v1/users/login";
        const payload = {
            data,
            history: history,
            url
        };
        login(payload);
    };

    onBlurHandler = e => {
        const emailRegex = /^([a-zA-Z0-9_\-\.]{1,})@([a-zA-Z0-9_\-\.]{1,})\.([a-zA-Z]{2,5})$/;
        this.setState({isEmailValid: emailRegex.test(e.target.value)});
    };

    onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

    onDismissHandler = () => {
        const {
            dismissLoginError
        } = this.props
        dismissLoginError();
    };
    
    responseFacebook = async response => {
        const accessToken = response.accessToken;
        const data = { access_token: accessToken };
        const {
            history,
            facebookLogin
        } = this.props;
        const url =
            "https://ah-backend-summer-staging.herokuapp.com/api/v1/users/login/facebook";
        const payload = {
            data,
            url,
            history: history,
            isSocialLogin: true
        };
        facebookLogin(payload);
    };

    responseGoogle = async response => {
        const accessToken = response.tokenId;
        const data = { access_token: accessToken };
        const {
            history,
            googleLogin
        } = this.props;
        const url =
            "https://ah-backend-summer-staging.herokuapp.com/api/v1/users/login/google";
        const payload = {
            data,
            url,
            history: history,
            isSocialLogin: true
        };
        googleLogin(payload);
    };
    
    render() {
        const { email, password, isEmailValid } = this.state;
        const { loading, loginError } = this.props;
        const loginProps = {
            responseFacebook: this.responseFacebook,
            responseGoogle: this.responseGoogle,
            onFailure: this.onFailure,
            email: email,
            password: password,
            onDismissHandler: this.onDismissHandler,
            loginError: loginError,
            onSubmitHandler: this.onSubmitHandler,
            onChangeHandler: this.onChangeHandler,
            loading: loading,
            onBlurHandler: this.onBlurHandler,
            isEmailValid: isEmailValid
        };
        return <Login {...loginProps} />;
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        facebookLogin: payload => dispatch(loginFetch(payload)),
        googleLogin: payload => dispatch(loginFetch(payload)),
        login: payload => dispatch(loginFetch(payload)),
        dismissLoginError: () => dispatch(removeLoginError())
    };
};
export const mapStateToProps = state => {
    return {
        loginError: state.login.loginError,
        loading: state.login.loading
    };
};

LoginView.propTypes = {
    history: PropTypes.object.isRequired,
    facebookLogin: PropTypes.func.isRequired,
    googleLogin: PropTypes.func.isRequired,
    dismissLoginError : PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    loginError: PropTypes.string.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginView);
