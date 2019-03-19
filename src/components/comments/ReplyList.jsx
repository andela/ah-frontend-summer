import React from "react";
import {Header} from "semantic-ui-react";
import PropTypes from "prop-types";
import ReplyContainer from "../../containers/Comments/ReplyContainer";

const ReplyList = ({commentReplies}) => {
    return (commentReplies.length === 0) ? (
        <Header className="reply-list-no-replies" as="h4">
            No replies yet
        </Header>
    ):
        commentReplies.map((reply) => {
            return <ReplyContainer key={reply.id} reply={reply} />;
        });
};

ReplyList.propTypes = {
    commentReplies: PropTypes.array.isRequired
};

export default ReplyList;
