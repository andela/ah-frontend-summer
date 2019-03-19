import {Button, Container, Header, Icon} from "semantic-ui-react";
import PropTypes from 'prop-types';
import React from 'react';

const CommentError = (props) => {
    const {retry, message} = props;
    return (
        <Container textAlign="center">
            <Icon size="large" color="teal" name="exclamation triangle" />
            <br />
            <Header as="h4">{message}</Header>
            <br />
            <Button
                size="medium" basic color="teal"
                onClick={retry}>
Retry
            </Button>
        </Container>
    );
};

CommentError.propTypes = {
    retry: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired
};

export default CommentError;
