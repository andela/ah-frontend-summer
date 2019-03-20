import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ResetPassword from '../../components/passwordReset/ResetPassword';
import {
    resetPasswordAction
} from '../../store/actions/async/passwordResetActions';
import { resetState } from '../../store/actions/sync/passwordResetActions';
import '../../assets/styles/Signup.scss';

export class PasswordResetContainer extends Component {

    state = {
        buttonDisabled: true,
        password: "",
        confirmPassword: "",
        errorMsg : null
    }

    onInputChange = (e) => {
        this.setState(
            {buttonDisabled : !(this.state.password.length >= 7),
            [e.target.name] : e.target.value}
        );
    }

    onSubmit = () => {
        if (this.state.password !== this.state.confirmPassword){
            this.setState({errorMsg: "Passwords do not match!"})
        }
        else {
            this.setState({errorMsg: null});
            let token = this.props.match.params.token
            const { resetPassword } = this.props;
            resetPassword(token, this.state.password)
        }
    };

    render() {

        const {
            error,
            message,
            loading,
            afterSubmit,
            isDisplayed
        } = this.props;

        const {
            buttonDisabled,
            errorMsg
        } = this.state;

        let showError = false;
        let incomingError = error;

        if (this.state.errorMsg !== null) {
            showError = true
        }else if (incomingError !== null) {
            this.setState({errorMsg: (('user' in incomingError)?
            incomingError.user.message : incomingError.errors.error[0])});
            showError = true
        };

        return (
            <div className="Signup">
                <ResetPassword
                    disabled={buttonDisabled}
                    isDisplayed={isDisplayed}
                    onSubmit={this.onSubmit}
                    onInputChange={this.onInputChange}
                    message={message}
                    afterSubmit={afterSubmit}
                    loading={loading}
                    errorMsg={errorMsg}
                    showError={showError}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.passwordReset.message,
        isDisplayed: state.passwordReset.msgDisplayed,
        loading: state.passwordReset.loading,
        error: state.passwordReset.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        resetPassword : (token, password) => {
            dispatch(resetPasswordAction(token, password))
        },
        afterSubmit : () => dispatch(resetState())
    };
};

PasswordResetContainer.propTypes = {
    message: PropTypes.string,
    loading: PropTypes.bool,
    isDisplayed: PropTypes.bool.isRequired,
    error: PropTypes.object,
    requestPasswordReset : PropTypes.func,
    afterSubmit : PropTypes.func
};

PasswordResetContainer.defaultProps = {
    loading: false,
    message: "success",
    error:null
};

export default connect(mapStateToProps, mapDispatchToProps)(
    PasswordResetContainer
);

