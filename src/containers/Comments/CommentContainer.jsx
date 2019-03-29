import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Comment from "../../components/comments/Comment";
import {
    deleteCommentAction,
    getLoggedInUser,
    updateCommentAction
} from "../../store/actions/async/CommentActions";
import {SUCCEEDED} from "../../store/actions/async";

class CommentContainer extends Component {
    deleteComment() {
        const {comment, doDeleteComment} = this.props;
        doDeleteComment(comment.id);
    }

    render() {
        const {deleteLoading, editComment} = this.props;
        return (
            <Comment
                loggedInUser={getLoggedInUser(localStorage)}
                editComment={editComment} type="comment"
                deleteLoading={deleteLoading}
                deleteComment={() => this.deleteComment()} {...this.props} />
        )}
}

export const mapDispatchToProps = (dispatch) => {
    return {
        editComment: (pk, body) => dispatch(updateCommentAction(pk, body)),
        doDeleteComment: (id) => dispatch(deleteCommentAction(id))
    };
};

export const mapStateToProps = (state, props) => {
    const pk = props.comment.id;
    const comment = state.comments.comments.filter((comment) => {
        return comment.id === pk;
    })[0];
    return {
        loading: typeof comment === "undefined" ? false : !!comment.loading,
        status: typeof comment === "undefined" ? SUCCEEDED : comment.status ? comment.status : SUCCEEDED,
        deleteLoading: state.comments.deleteComment.loading
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentContainer);

CommentContainer.propTypes = {
    comment: PropTypes.object.isRequired,
    deleteLoading: PropTypes.bool.isRequired,
    doDeleteComment: PropTypes.func.isRequired,
    editComment: PropTypes.func.isRequired
};
