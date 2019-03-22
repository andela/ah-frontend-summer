import {Button, Container, Header, Icon} from "semantic-ui-react";
import PropTypes from 'prop-types';
import React from 'react';

const TagError = (props) => {
    const { retry } = props;
    return (
        <Container textAlign="center">
            <Icon size="big" color="teal" name="exclamation triangle" />
            <br />
            <Header as="h3">Could not load Tags</Header>
            <br />
            <Button size="large" basic color="teal" onClick={retry}>Retry</Button>
        </Container>
    );
};

TagError.propTypes = {
    retry: PropTypes.func.isRequired
};

export default TagError;
