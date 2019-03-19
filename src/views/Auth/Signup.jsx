import React, { Component } from 'react';
import { connect } from 'react-redux';

import SignupForm from '../../components/UI/Signup/Signup';
import * as actions from '../../store/actions/index';
import '../../assets/styles/Signup.scss';

export class Signup extends Component {

    state = {
        disabled: false,
        userInfo: {
            username: "",
            password: "",
            email: ""
        },
        error: false,
        emailTouched: false,
        passwordTouched: false,
        usernameTouched: false,
        confirmPassword: "",
        passwordsDontMatch: false
    }

    loginRedirectHandler = () => {
        this.props.history.push('/login')
    }

    validateInputHandler = (e) => {
        let currentState = { ...this.state }
        const updateUserInfo = { ...currentState.userInfo }
        let disableBtn = true
        let usernameTouched = false
        let emailTouched = false
        let passwordTouched = false
        let updatedConfPassword = currentState.confirmPassword

        if (e.target.name === "email") {
            updateUserInfo.email = e.target.value
            emailTouched = false
        } else if (e.target.name === "username") {
            updateUserInfo.username = e.target.value
            usernameTouched = false
            emailTouched = this.state.userInfo.email.length <= 7
        } else if (e.target.name === "password") {
            updateUserInfo.password = e.target.value
            passwordTouched = false
            emailTouched = this.state.userInfo.email.length <= 7
            usernameTouched = this.state.userInfo.username.length <= 5
        } else if (e.target.name === "cPassword") {
            emailTouched = this.state.userInfo.email.length < 5
            usernameTouched = this.state.userInfo.username.length < 4
            passwordTouched = this.state.userInfo.password.length < 7
            updatedConfPassword = e.target.value
        }

        if (updateUserInfo.username !== "") {
            disableBtn = updateUserInfo.username.length > 2 && disableBtn
        }
        if (updateUserInfo.password !== "") {
            disableBtn = updateUserInfo.password.length > 7 && disableBtn
        }
        if (updateUserInfo.username === "" || updateUserInfo.password === "" || updateUserInfo.password === "") {
            disableBtn = false
        }

        this.setState({
            disabled: disableBtn,
            userInfo: updateUserInfo,
            usernameTouched: usernameTouched,
            emailTouched: emailTouched,
            passwordTouched: passwordTouched,
            confirmPassword: updatedConfPassword
        })
        e.preventDefault();
    }

    registerUserHanler = () => {
        const passwordsDontMatch = this.state.confirmPassword !== this.state.userInfo.password;
        this.setState({
            passwordsDontMatch: passwordsDontMatch,
        })

        if (!this.state.passwordsDontMatch) {
            this.props.registerUser(this.state.userInfo);
        }
    }

    render() {
        this.failedError = null
        this.formError = false
        this.successColor = null

        if (this.state.passwordsDontMatch) {
            this.failedError = "Sorry passwords don't match";
            this.formError = true
        } else if (this.props.error !== null && this.props.error.errors.email) {
            this.failedError = this.props.error.errors.email[0]
            this.formError = true
        } else if (this.props.error !== null && this.props.error.errors.username) {
            this.failedError = this.props.error.errors.username[0]
            this.formError = true
        } else if (this.props.error !== null && this.props.error.errors.password) {
            this.failedError = this.props.error.errors.password[0]
            this.formError = true
        } else if (this.props.registered !== null) {
            this.formError = true
            this.successColor = "green"
            this.failedError = this.props.registered.msg
        }

        return (
            <div className="Signup">
                <SignupForm
                    loginRedirect={this.loginRedirectHandler}
                    inputChanged={this.validateInputHandler}
                    disabled={!this.state.disabled}
                    isEmailEmpty={this.state.isEmailEmpty}
                    isPasswordEmpty={this.state.isPasswordEmpty}
                    submitData={this.registerUserHanler}
                    registrationError={this.failedError}
                    usernameError={this.state.usernameTouched}
                    passwordError={this.state.passwordTouched}
                    emailError={this.state.emailTouched}
                    setError={this.formError}
                    loading={this.props.loading}
                    green={this.successColor} />
            </div>
        );
    }
}

export const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        registered: state.auth.user
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
        registerUser: (userData) => dispatch(actions.registerUser(userData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
