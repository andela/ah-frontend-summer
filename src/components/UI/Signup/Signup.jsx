import React from 'react';
import { Form, Grid, Segment, Button, Header, Divider, Message } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom'

import '../../../assets/styles/SignupForm.css';

const signup = (props) => {
    return (
        <div className="SignupForm">
            <Grid columns={2} relaxed='very' stackable>
                <Grid.Column></Grid.Column>
                <Grid.Column padded='very'>
                    <Segment padded='very' color='green'>
                        <Header as='h1' textAlign='center' padded="very">
                            Authors Haven
                        </Header>
                        <Header as='h3' color='teal' textAlign='center'>
                            A home for the creative at heart
                        </Header>
                        <Header as='h5' textAlign='center'>
                            Signup to see more
                        </Header>
                        <Form error={props.setError}>
                            <div className="spaceComponents">
                                {props.registrationError ?
                                    <Message error content={props.registrationError} color={props.green} /> : null
                                }
                                <Form.Input
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Email'
                                    required
                                    color="red"
                                    onChange={props.inputChanged}
                                    name="email"
                                    onBlur={props.inInputBlur}
                                    isfieldempty="isEmailEmpty"
                                    error={props.emailError} />
                                <Form.Input
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='Username'
                                    required
                                    color="red"
                                    onChange={props.inputChanged}
                                    name="username"
                                    error={props.usernameError} />
                                <Form.Input
                                    icon='lock'
                                    iconPosition='left'
                                    type='password'
                                    placeholder='Password'
                                    required
                                    onChange={props.inputChanged}
                                    name="password"
                                    onBlur={props.inInputBlur}
                                    error={props.passwordError} />
                                <Form.Input
                                    icon='lock'
                                    iconPosition='left'
                                    type='password'
                                    placeholder='Confirm password'
                                    required
                                    onChange={props.inputChanged}
                                    name="cPassword" />
                            </div>

                            <div className="spaceComponents">
                                <center>
                                    <Button
                                        color='teal'
                                        loading={props.loading}
                                        size="big"
                                        centered
                                        disabled={props.disabled}
                                        onClick={props.onSubmit}
                                        loading={props.loading}
                                        onClick={props.submitData}
                                        className="SignupBtn">
                                        Signup
                                    </Button>
                                </center>
                            </div>
                        </Form>
                        <Divider horizontal>Or</Divider>
                        <div className="spaceComponents">
                            <NavLink to="/login" >
                                <Header color='teal' textAlign='center' padded="very">
                                    Login
                                </Header>
                            </NavLink>
                        </div>
                    </Segment>
                </Grid.Column>
            </Grid>
        </div>
    );
}

export default signup;
