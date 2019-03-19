import {connect} from "react-redux";
import {createReplyAction} from "../../store/actions/async/CommentActions";
import {NewCommentContainer} from "./NewCommentContainer";
import {SUCCEEDED} from "../../store/actions/async";

const mapStateToProps = (state, props) => {
    const commentPk = props.slug;
    const singleReplyState = state.replies[commentPk];
    let newReply = singleReplyState && singleReplyState.newReply ? singleReplyState.newReply : {
        loading: false,
        status: SUCCEEDED
    };
    return {
        loading: typeof singleReplyState === "undefined" ? false : newReply.loading,
        status: typeof singleReplyState === "undefined" ? SUCCEEDED : newReply.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createComment: (pk, body) => dispatch(createReplyAction(pk, body))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCommentContainer);
