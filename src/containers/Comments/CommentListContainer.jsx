import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, Comment, Header} from "semantic-ui-react";
import {Link} from "react-router-dom";
import CommentList from "../../components/comments/CommentList";
import {
    fetchCommentsAction,
    isLoggedIn
} from "../../store/actions/async/CommentActions";
import CommentLoading from "../../components/comments/CommentLoading";
import {SUCCEEDED} from "../../store/actions/async";
import CommentError from "../../components/comments/CommentError";
import NewCommentContainer from "./NewCommentContainer";


class CommentListContainer extends Component {
    componentDidMount() {
        this.fetchCommentsData();
    }

    fetchCommentsData() {
        const {slug, fetchComments} = this.props;
        fetchComments(slug);
    }

    render() {
        const {comments, loading, status, slug} = this.props;
        let commentsContentToRender;
        if (loading) {
            commentsContentToRender = (
                <CommentLoading />
            );
        } else {
            if (status === SUCCEEDED) {
                commentsContentToRender = <CommentList comments={comments} />;
            } else {
                commentsContentToRender = (
                    <CommentError
                        retry={() => this.fetchCommentsData()}
                        message="Could not load Comments" />
                );
            }
        }
        return (
            <Comment.Group size="large" className="comment-list">
                <Header
                    className="comment-teal" as="h1"
                    dividing>
                    Comments
                </Header>
                {isLoggedIn(localStorage) ? (
                    <NewCommentContainer
                        placeholder="Add a comment..."
                        slug={slug} />
                ): (
                    <div className="center">
                        <Link to="/login">
                            <Button size="large" color="teal">
                                Login to have your say
                            </Button>
                        </Link>
                    </div>
                )}
                {commentsContentToRender}
            </Comment.Group>
        );
    }
}

CommentListContainer.propTypes = {
    loading: PropTypes.bool,
    status: PropTypes.string.isRequired,
    fetchComments: PropTypes.func.isRequired,
    comments: PropTypes.array.isRequired,
    slug: PropTypes.string.isRequired
};

CommentListContainer.defaultProps = {
    loading: true,
};

const mapStateToProps = (state) => {
    return {
        comments: state.comments.comments,
        loading: state.comments.loading,
        status: state.comments.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchComments: (slug) => {
            dispatch(fetchCommentsAction(slug));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer);
