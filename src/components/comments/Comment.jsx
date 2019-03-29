import {Comment, Segment} from "semantic-ui-react";
import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import avatar from "../../assets/images/guy.jpg";
import CommentReplyListContainer
    from "../../containers/Comments/CommentReplyListContainer";
import CommentBodyContainer
    from "../../containers/Comments/CommentBodyContainer";
import ConfirmationPopup from "./ConfirmationPopup";
import LikeDislikeComment from "./LikeDislikeComment";

class SingleComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            repliesVisible: false,
            editing: false
        };
    }

    toggleVisibility(showComments = false) {
        const {repliesVisible} = this.state;
        this.setState({
            repliesVisible: !repliesVisible || showComments,
            editing: false
        });
    }

    render() {
        const {
            comment,
            editComment,
            deleteComment,
            deleteLoading,
            type,
            loading,
            status,
            loggedInUser,
        } = this.props;

        let {author: commentAuthor,
            created_at: createdAt
        } = comment;
        const {
            like_status: liked,
            dislike_status: disliked,
            like_count: likeCount,
            dislike_count: dislikeCount,
            id
        } = comment;
        const {
            first_name: firstName,
            last_name: lastName,
            username: userName,
            image
        } = commentAuthor;
        let displayImage = image ? image : avatar;
        // the ideal approach would be to display the author's name
        // however by default the first and last names are empty, so we have
        // to display the username in that situation
        let author = firstName + " " + lastName;
        author = firstName && lastName ? author : userName;

        // get a pretty form of the date
        createdAt = createdAt.substr(0, createdAt.indexOf('T'));
        const {repliesVisible, editing} = this.state;
        const showOrHide = repliesVisible ? "Hide Replies" : "Show Replies";
        const isOwner = userName === loggedInUser;
        const commentOnlyActions = type === "comment" ? (
            <>
                <LikeDislikeComment
                liked={liked}
                disliked={disliked}
                likeCount={likeCount}
                dislikeCount={dislikeCount}
                id={id}
                isOwner={isOwner} />
                <Comment.Action onClick={() => {
                    this.toggleVisibility(true);
                }}>
                    Reply
                </Comment.Action>
                <Comment.Action className="comment-separator">|</Comment.Action>
                <Comment.Action
                    className="toggle-reply-visibility-action" onClick={() => {
                        this.toggleVisibility();
                    }}>
                    {showOrHide}
                </Comment.Action>
            </>
        ) : "";

        return (
            <Segment>
                <Comment>
                    <Comment.Content>
                        <Comment.Avatar
                            className="comment-avatar"
                            onError={(event) => {
                                if (event.target.src !== avatar) event.target.src = avatar;
                            }} src={displayImage} />
                    </Comment.Content>
                    <Comment.Content>
                        <Comment.Author>
                            <Link
                                to={`/profiles/${userName}`}>
                                {author}
                            </Link>
                        </Comment.Author>
                        <div>
                            <Comment.Metadata>
                                <div>{createdAt}</div>
                            </Comment.Metadata>
                        </div>
                        <Comment.Text className="comment-text">
                            <CommentBodyContainer
                                loading={loading} status={status}
                                editComment={editComment}
                                finishEditing={() => (this.finishEditing())}
                                editing={editing}
                                body={comment.body} pk={comment.id} />
                        </Comment.Text>
                        <Comment.Actions>
                            {commentOnlyActions}
                            {!isOwner ? '' : (
                                <>
                                    {type === "comment" ? (
                                        <Comment.Action
                                            className="comment-separator">
|
                                        </Comment.Action>
                                    ): ''}
                                    {editing ? '' : (
                                        <Comment.Action
                                            className="edit-action"
                                            onClick={() => this.startEditing()}>
Edit
                                        </Comment.Action>
                                    )}
                                    <ConfirmationPopup
                                        className="delete-action"
                                        loading={deleteLoading}
                                        action={() => deleteComment()}
                                        text="Delete" />
                                </>
                            )}
                        </Comment.Actions>
                    </Comment.Content>
                    {repliesVisible && type === "comment" ?
                        <CommentReplyListContainer pk={comment.id} /> : ''}
                </Comment>
            </Segment>
        );
    }

    finishEditing() {
        this.setState({
            editing: false
        });
    }

    startEditing() {
        this.setState({
            editing: true
        });
    }
}

SingleComment.propTypes = {
    comment: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
    deleteLoading: PropTypes.bool.isRequired,
    editComment: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    loggedInUser: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};

export default SingleComment;
