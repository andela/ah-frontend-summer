import {Button, Comment, Header} from "semantic-ui-react";
import React, {Component} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import ReplyList from "../../components/comments/ReplyList";
import {
    fetchRepliesAction,
    isLoggedIn
} from "../../store/actions/async/CommentActions";
import CommentLoading from "../../components/comments/CommentLoading";
import {SUCCEEDED} from "../../store/actions/async";
import CommentError from "../../components/comments/CommentError";
import NewReplyContainer from "./NewReplyContainer";

class CommentReplyListContainer extends Component {
    componentDidMount() {
        this.fetchReplyData();
    }

    fetchReplyData() {
        const {pk, fetchReplies} = this.props;
        fetchReplies(pk);
    }

    render() {
        const {replies, loading, status, pk} = this.props;
        let commentRepliesContentToRender;
        if (loading) {
            commentRepliesContentToRender = (
                <CommentLoading />
            );
        } else {
            if (status === SUCCEEDED) {
                commentRepliesContentToRender =
                    <ReplyList commentReplies={replies} />;
            } else {
                commentRepliesContentToRender = (
                    <CommentError
                        retry={() => this.fetchReplyData()}
                        message="Could not load Replies" />
                );
            }
        }

        return (
            <Comment.Group size="small">
                <Header
                    className="comment-teal" as="h4"
                    dividing>
                    Replies
                </Header>
                {isLoggedIn(localStorage) ? (
                    <NewReplyContainer
                        placeholder="Reply to this comment..."
                        slug={pk} />
                ): (
                    <div className="center">
                        <Link to="/login">
                            <Button size="tiny" color="teal">
                                Login to have your say
                            </Button>
                        </Link>
                    </div>
                )}
                {commentRepliesContentToRender}
            </Comment.Group>
        );
    }
}

CommentReplyListContainer.propTypes = {
    replies: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    status: PropTypes.string.isRequired,
    pk: PropTypes.number.isRequired,
    fetchReplies: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
    const reply = state.replies[props.pk];
    // if you closely examine the way we are handling state for the replies,
    // you notice that we can't use a single list of replies
    // since multiple comment's each with their own replies can appear in a single
    // component. This state cannot be given a default state in the reducers though
    // since we do not know which replies we need until a user tries to fetch them
    // The goal here is therefore to handle the situation where the component tries to render
    // before the commentReply state has been instantiated
    const blank = typeof reply === 'undefined' || !reply;
    return {
        replies: blank ? [] : reply.replies ? reply.replies : [],
        loading: blank ? true : !!reply.loading,
        status: blank ? SUCCEEDED : reply.status ? reply.status : SUCCEEDED
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchReplies: (pk) => dispatch(fetchRepliesAction(pk))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentReplyListContainer);
