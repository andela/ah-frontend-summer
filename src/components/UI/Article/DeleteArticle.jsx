import React from 'react';
import { Button, Container } from 'semantic-ui-react'

const deleteArticleButtons = (props) => {
    const {deleteArticle, dismissModal } = props;
    return (
        <Container textAlign="center">
            <div>
                <p>Are you sure you want to delete this article?</p>
                <Button
                    color='red'
                    onClick={deleteArticle}
                    >Yes</Button> 
                <Button
                    color='blue'
                    onClick={dismissModal}
                    >No</Button>
            </div>
        </Container>
    );
};

export default deleteArticleButtons
