import React from "react";
import { Form, Card, Grid, Message } from "semantic-ui-react";
import classes from "../styles/login.module.css";
import '../styles/login.css'

const Login = props => {
    const {
        email,
        password,
        onDismissHandler,
        loginError,
        onSubmitHandler,
        onChangeHandler
    } = props;

    const isLoginError = (
        <Message
        negative
        content="Incorrect email or password"
        onDismiss={onDismissHandler}
        />
    );
    return (
        <div className={classes.LoginPage}>
        <Grid columns={2} stackable>
            <Grid.Column width={7}></Grid.Column>
            <Grid.Column
            floated="right"
            width={7}
            >
            <Card fluid>
                <Card.Content>
                    <div>
                        <center>
                            <h3 className={classes.cardHeader}>Author’s Haven</h3>
                            <p className={classes.cardDesc}>A Home of the Creative at Heart</p>
                        </center>
                    </div>
                {loginError ? isLoginError : null}
                <Form onSubmit={onSubmitHandler} className={classes.cardForm}>
                    <center>
                        <Form.Field>
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={onChangeHandler}
                            style={{width:'50%'}}
                        />
                        </Form.Field>
                        <Form.Field>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={onChangeHandler}
                            style={{width:'50%'}}
                        />
                        </Form.Field>
                        <button type="submit" className={classes.cardButton}>
                        Sign in
                        </button>
                    </center>
                </Form>
                <div className={classes.divide}>
                    <center>
                    <h3>OR</h3>
                    </center>
                </div>

                <div className={classes.divide}>
                    <center>
                    <a>Sign up</a>
                    </center>
                </div>
                </Card.Content>
            </Card>
            </Grid.Column>
        </Grid>
        </div>
    );
};

export default Login;
