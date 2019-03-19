import {Placeholder, Segment} from "semantic-ui-react";
import React from "react";

const CommentLoading = () => {
    return (
        <Segment raised>
            <Placeholder>
                <Placeholder.Header image>
                    <Placeholder.Line length="short"/>
                    <Placeholder.Line length="medium"/>
                </Placeholder.Header>
                <Placeholder.Paragraph>
                    <Placeholder.Line/>
                </Placeholder.Paragraph>
            </Placeholder>
        </Segment>
    );
};

export default CommentLoading;
