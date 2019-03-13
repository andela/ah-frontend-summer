import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Segment, Message } from 'semantic-ui-react';

import * as actions from '../../store/actions/index';

export class EmailVerification extends Component {

    componentDidMount() {
        this.props.onVerifyUserAccount(this.props.match.params.token)
    }

    render() {
        this.redirectToHome = null;
        if (this.props.loading) {
            this.redirectToHome = (<p>Hang in tight your as your email is getting verified</p>)
        } else if (this.props.token !== null) {
            this.redirectToHome = (<Redirect to="/" />)
        } else if (this.props.error !== null) {
            this.redirectToHome = (
                <Segment padded='very' color='green'>
                    <Message
                        color="red"
                        header="Warning"
                        content={this.props.error.msg}
                    />
                </Segment>
            );
        }

        return (
            <div>
                {this.redirectToHome}
            </div>
        );
    }
}

export const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        token: state.auth.token,
        error: state.auth.error
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
        onVerifyUserAccount: (verificationToken) => dispatch(actions.verifyUserAccount(verificationToken))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerification);
