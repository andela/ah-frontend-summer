import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RequestPasswordReset
from '../../components/passwordReset/RequestPasswordReset';
import {
    requestPasswordResetAction
} from '../../store/actions/async/passwordResetActions';
import { resetState } from '../../store/actions/sync/passwordResetActions';
import '../../assets/styles/Signup.scss';

export class PasswordRequestContainer extends Component {

    state = {
        buttonDisabled: true,
        email: "",
    }

    onInputChange = (e) => {
        const emailRegex = (
            /^([a-zA-Z0-9_\-\.]{1,})@([a-zA-Z0-9_\-\.]{1,})\.([a-zA-Z]{2,5})$/
        );
        this.setState(
            {buttonDisabled: !emailRegex.test(e.target.value),
                email : e.target.value}
        )
    }

    onSubmit = () => {
        const { requestPasswordReset } = this.props;
        requestPasswordReset(this.state.email);
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
        } = this.state;

        let errorMsg = null
        let showError = false
        let incomingError = error

        if (incomingError !== null) {
            errorMsg = (
                ('user' in incomingError)? incomingError.user.message :
            incomingError.errors[0])
            showError = true
        }

        return (
            <div className="Signup">
                <RequestPasswordReset
                    disabled={buttonDisabled}
                    isDisplayed={isDisplayed}
                    onSubmit={this.onSubmit}
                    onInputChange={this.onInputChange}
                    message={message}
                    loading={loading}
                    errorMsg={errorMsg}
                    showError={showError}
                    afterSubmit={afterSubmit}
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
        requestPasswordReset : (email) => {
            dispatch(requestPasswordResetAction(email))
        },
        afterSubmit : () => dispatch(resetState())
    };
};

PasswordRequestContainer.propTypes = {
    isDisplayed: PropTypes.bool.isRequired,
    message: PropTypes.string,
    loading: PropTypes.bool,
    error: PropTypes.object,
    requestPasswordReset : PropTypes.func,
    afterSubmit : PropTypes.func
};

PasswordRequestContainer.defaultProps = {
    loading: false,
    message: "success",
    error:null
};

export default connect(mapStateToProps, mapDispatchToProps)(
    PasswordRequestContainer
);
