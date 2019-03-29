import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getLoggedInUser, SUCCEEDED} from "../../store/actions/async";
import {
    deleteReplyAction,
    updateReplyAction
} from "../../store/actions/async/CommentActions";
import Comment from "../../components/comments/Comment";

class ReplyContainer extends Component {
    deleteReply() {
        const {reply, doDeleteReply} = this.props;
        doDeleteReply(reply.id, reply.comment);
    }

    render() {
        const {deleteLoading, reply} = this.props;
        return (
            <Comment
                loggedInUser={getLoggedInUser(localStorage)}
                editComment={(pk, body) => this.editReply(pk, body)}
                type="reply" deleteLoading={deleteLoading}
                deleteComment={() => this.deleteReply()}
                comment={reply} {...this.props} />
        );
    }

    editReply(pk, body) {
        const {doEditReply, reply} = this.props;
        doEditReply(pk, reply.comment, body);
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        doEditReply: (pk, commentPk, body) => dispatch(updateReplyAction(pk, commentPk, body)),
        doDeleteReply: (id, commentPk) => dispatch(deleteReplyAction(id, commentPk))
    };
};

const mapStateToProps = (state, props) => {
    const pk = props.reply.id;
    const commentPk = props.reply.comment;
    const commentRepliesState = state.replies[commentPk];
    let reply = commentRepliesState.replies.filter((reply) => {
        return reply.id === pk;
    })[0];
    return {
        deleteLoading: commentRepliesState.deleteReply ? commentRepliesState.deleteReply.loading : false,
        deleteStatus: commentRepliesState.deleteReply ? commentRepliesState.deleteReply.status : SUCCEEDED,
        loading: reply.loading ? reply.loading : false,
        status: reply.status ? reply.status : SUCCEEDED
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReplyContainer);

ReplyContainer.propTypes = {
    deleteLoading: PropTypes.bool.isRequired,
    doDeleteReply: PropTypes.func.isRequired,
    doEditReply: PropTypes.func.isRequired,
    reply: PropTypes.object.isRequired
};
