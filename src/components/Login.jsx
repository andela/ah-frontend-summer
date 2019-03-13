import React from "react";
import PropTypes from 'prop-types';
import { Form, Grid, Segment, Message, Divider, Header } from "semantic-ui-react";
import classes from "../styles/login.module.css";
import '../styles/login.css';


const Login = props => {
    const {
        email,
        password,
        onDismissHandler,
        loginError,
        onSubmitHandler,
        onChangeHandler,
        loading,
        onBlurHandler,
        isEmailValid
    } = props;

    const loginErorMsg = (
        <Message
            negative
            content={loginError}
            onDismiss={onDismissHandler}
            style={{ width: '50%', margin: 'auto' }}
        />
    );
    const emailInvalidError = <div style={{ color: "red" }}>Please enter a valid email</div>;
    return (
        <div className={classes.LoginPage}>
            <Grid columns={2} stackable>
                <Grid.Column width={7}></Grid.Column>
                <Grid.Column
                    width={8}
                    padded="very"
                >
                    <Segment padded="very" color="green">

                        <Header as='h1' textAlign='center' padded="very">Author's Haven</Header>
                        <Header as='h6' style={{ color: "#008080", marginTop: "5px", textAlign: 'center', fontSize: "1em" }}>A home for the creative at heart</Header>

                        <br />
                        {loginError ? loginErorMsg : null}
                        <Form onSubmit={onSubmitHandler} className={classes.cardForm}>
                            <center>
                                <Form.Field>
                                    <input
                                        style={!isEmailValid ? { borderColor: "red", width: '50%' } : { width: '50%' }}
                                        type="text"
                                        placeholder="Email"
                                        name="email"
                                        value={email}
                                        onChange={onChangeHandler}
                                        onBlur={onBlurHandler}
                                    />
                                    {!isEmailValid ? emailInvalidError : null}
                                </Form.Field>
                                <Form.Field>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={password}
                                        onChange={onChangeHandler}
                                        style={{ width: '50%' }}
                                    />
                                </Form.Field>
                                <Form.Button type="submit" className="login" loading={loading}>Sign in</Form.Button>
                            </center>
                        </Form>
                        <Divider horizontal>Or</Divider>
                        <br />
                        <div className="spaceComponents">
                            <Header style={{ color: "#008080" }} textAlign='center' padded="very">Sign up</Header>
                        </div>

                    </Segment>
                </Grid.Column>
            </Grid>
        </div>
    );
};

Login.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onDismissHandler: PropTypes.func.isRequired,
    loginError: PropTypes.string.isRequired,
    onSubmitHandler: PropTypes.func.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    onBlurHandler: PropTypes.func.isRequired
};

export default Login;
