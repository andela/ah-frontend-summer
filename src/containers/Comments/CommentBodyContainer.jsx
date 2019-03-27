import React, {Component} from "react";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Button} from "semantic-ui-react";
import PropTypes from "prop-types";
import {SUCCEEDED} from "../../store/actions/async";

const commentBoxConfigEdit = {
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
    placeholder: 'Update comment...'
};

class CommentBodyContainer extends Component {
    state = {
        body: this.props.body
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !!this.editor;
    }

    componentDidUpdate(prevProps) {
        const {loading, status, finishEditing} = this.props;
        if (prevProps.loading && !loading) {
            if (status === SUCCEEDED) {
                finishEditing();
            }
        }
    }

    render() {
        const {body} = this.state;
        const {finishEditing, editing, loading} = this.props;
        const bodyIsEmpty = body.length === 0;
        const editorClass = editing ? 'nunito' : 'nunito disabled';
        const buttons = !editing ? '' : (
            <div className="comment-new-comment-buttons">
                <Button
                    disabled={bodyIsEmpty || loading} loading={loading}
                    onClick={() => {
                        this.updateComment();
                    }} color="teal">
                    Save
                </Button>
                <Button
                    negative onClick={() => {
                        this.resetBody();
                        finishEditing();
                    }}>
                    Cancel
                </Button>
            </div>
        );
        return (
            <div className={editorClass}>
                <CKEditor
                    disabled={!editing}
                    editor={ClassicEditor}
                    config={commentBoxConfigEdit}
                    data={body}
                    onChange={(event, editor) => {
                        this.setState({
                            body: editor.getData()
                        });
                    }}
                    onInit={(editor) => {
                        this.editor = editor;
                    }}/>
                {buttons}
            </div>
        );
    }

    updateComment() {
        const {pk, editComment} = this.props;
        const {body} = this.state;
        editComment(pk, body);
    }

    resetBody() {
        const {body} = this.props;
        this.setState({body});
    }
}

CommentBodyContainer.propTypes = {
    body: PropTypes.string.isRequired,
    editComment: PropTypes.func.isRequired,
    editing: PropTypes.bool.isRequired,
    finishEditing: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    pk: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired
};

export default CommentBodyContainer;
