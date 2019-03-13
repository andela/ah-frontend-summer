import React, { Component } from "react";
import Login from "../components/Login";
import { connect } from "react-redux";
import { loginFetch } from "../store/actions/async/login";
import { removeLoginError } from "../store/actions/sync/login";

export class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
        email: "",
        password: ""
        };
    }

    onSubmitHandler = e => {
        e.preventDefault();
        const { email, password } = this.state;
        const data = { email, password };
        const url =
        "https://ah-backend-summer-staging.herokuapp.com/api/v1/users/login";
        const payload = {
        data,
        history: this.props.history,
        url
        };
        this.props.login(payload);
    };

    onChangeHandler = e => this.setState({ [e.target.name]: e.target.value });

    onDismissHandler = () => this.props.dismissLoginError();

    render() {
        const loginProps = {
        email: this.state.email,
        password: this.state.password,
        onDismissHandler: this.onDismissHandler,
        loginError: this.props.loginError,
        onSubmitHandler: this.onSubmitHandler,
        onChangeHandler: this.onChangeHandler
        };
        return <Login {...loginProps} />;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: payload => dispatch(loginFetch(payload)),
        dismissLoginError: () => dispatch(removeLoginError())
    };
};

const mapStateToProps = state => {
    return {
        loginError: state.login.loginError
    };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginView);
