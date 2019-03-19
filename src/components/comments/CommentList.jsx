import React from "react";
import {Header} from "semantic-ui-react";
import PropTypes from 'prop-types';
import CommentContainer from "../../containers/Comments/CommentContainer";

const CommentList = ({comments}) => {
    return (comments.length === 0) ? (
        <Header className="comment-list-no-comments" as="h3">
            No comments yet
        </Header>
    ):
        comments.map((comment) => {
            return <CommentContainer key={comment.id} comment={comment} />;
        });
};

export default CommentList;

CommentList.propTypes = {
    comments: PropTypes.array.isRequired
};
