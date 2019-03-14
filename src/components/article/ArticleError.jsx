import {Button, Container} from "semantic-ui-react";
import PropTypes from 'prop-types';
import React from 'react';

const ArticleError = (props) => {
    const { retry } = props;
    return (
        <Container>
            Could not load Articles
            <Button size="medium" onClick={retry}>Retry</Button>
        </Container>
    );
};

ArticleError.propTypes = {
    retry: PropTypes.func.isRequired
};

export default ArticleError;
