import React from 'react';
import PropTypes from 'prop-types';
import {
    Form, Grid, Segment, Button, Header, Divider, Message
}from 'semantic-ui-react';
import { Link } from 'react-router-dom'
import '../../assets/styles/SignupForm.scss';

const RequestPasswordReset = (props) => {

    const {
        isDisplayed,
        onInputChange,
        disabled,
        loading,
        onSubmit,
        afterSubmit,
        showError,
        errorMsg,
        message
    } = props;

    return (
        <div className="SignupForm">
            <Grid columns={2} relaxed='very' stackable>
                <Grid.Column></Grid.Column>
                <Grid.Column padded='very'>
                    <Segment padded='very'>
                        <Header as='h1' textAlign='center'>
                            Authors Haven
                        </Header>
                        <Header as='h4' color='teal' textAlign='center'>
                            A home for the creative at heart
                        </Header>
                        <br />
                        <br />
                        <div style={{display : !isDisplayed && "none"}}>
                            <Form>
                                <Header as='h5' textAlign='center'>
                                    Enter your registered email to reset your password
                                </Header>
                                { showError ? (
                                    <Message color="red">
                                        {errorMsg}
                                    </Message>
                                ): null
                                }
                                <div className="spaceComponents">
                                    <Form.Input
                                        icon='mail'
                                        iconPosition='left'
                                        placeholder='Email'
                                        required
                                        onChange={onInputChange}
                                        name="email" />
                                </div>

                                <div className="spaceComponents">
                                    <center>
                                        <Button
                                            color='teal'
                                            size="big"
                                            disabled={disabled}
                                            loading={loading}
                                            onClick={onSubmit}
                                            className="SignupBtn">
                                            Next
                                        </Button>
                                    </center>
                                </div>
                            </Form>
                            <Divider horizontal>Or</Divider>
                            <div className="spaceComponents">
                                <Header color='teal' textAlign='center' padded="very">
                                    <Link to='/'>Home</Link> | <Link to='/login'>Login</Link>
                                </Header>
                            </div>
                        </div>
                        <div style={{display : isDisplayed && "none"}}>
                            <hr/>
                            <br />
                            <br />
                            <Header as='h3' color='teal' textAlign='center'>
                                { message }
                            </Header>
                            <br />
                            <br />
                            <hr/>
                            <br />
                            <div className="spaceComponents">
                                <center>
                                    <Link to="/">
                                        <Button
                                            color='teal'
                                            size="big"
                                            loading={loading}
                                            onClick={afterSubmit}
                                            className="SignupBtn">
                                            OK
                                        </Button>
                                    </Link>
                                </center>
                            </div>
                        </div>
                    </Segment>
                </Grid.Column>
            </Grid>
        </div>
    );
};

RequestPasswordReset.propTypes = {
    isDisplayed: PropTypes.bool.isRequired,
    onInputChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    afterSubmit: PropTypes.func,
    showError: PropTypes.bool.isRequired,
    errorMsg: PropTypes.string,
    message: PropTypes.string
};

RequestPasswordReset.defaultProps = {
    errorMsg: "Error",
    message: "success!"
};

export default RequestPasswordReset;
