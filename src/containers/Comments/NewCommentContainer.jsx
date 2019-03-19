import React, {Component} from "react";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Button, Segment} from "semantic-ui-react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {createCommentAction} from "../../store/actions/async/CommentActions";
import {SUCCEEDED} from "../../store/actions/async";

export class NewCommentContainer extends Component {
    state = {
        body: "",
    };

    componentDidUpdate(prevProps) {
        const {loading, status} = this.props;
        if (prevProps.loading && !loading) {
            if (status === SUCCEEDED) {
                this.clearBody();
            }
        }
    }

    createNewComment() {
        const {body} = this.state;
        const {slug, createComment} = this.props;
        createComment(slug, body);
    }

    clearBody() {
        this.setState({
            body: ""
        });
    }

    render() {
        const {body} = this.state;
        const {loading, placeholder} = this.props;
        const bodyIsEmpty = body.length === 0;
        const commentBoxConfig = {
            toolbar: [
                'bold',
                'italic',
                '|',
                'bulletedList',
                'numberedList',
                'blockQuote',
                '|',
                'undo',
                'redo'
            ],
            placeholder: placeholder
        };
        return (
            <Segment>
                <CKEditor
                    className="nunito"
                    editor={ClassicEditor}
                    config={commentBoxConfig}
                    data={body}
                    onChange={(event, editor) => {
                        this.setState({
                            body: editor.getData()
                        });
                    }}
                />
                <div className="comment-new-comment-buttons">
                    <Button
                        disabled={bodyIsEmpty || loading} loading={loading}
                        onClick={() => {
                            this.createNewComment();
                        }} color="teal">
                        Save
                    </Button>
                    <Button
                        negative onClick={() => {
                            this.clearBody();
                        }}>
                        Cancel
                    </Button>
                </div>
            </Segment>
        );
    }
}

NewCommentContainer.propTypes = {
    createComment: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    placeholder: PropTypes.string.isRequired,
    slug: PropTypes.any.isRequired,
    status: PropTypes.string.isRequired
};

export const mapStateToProps = (state) => {
    const newComment = state.comments.newComment;
    const {loading, status} = newComment;
    return {
        loading,
        status
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
        createComment: (slug, body) => dispatch(createCommentAction(slug, body))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCommentContainer);
