import React, { Component } from "react";
import { connect } from "react-redux";
import { EditorState } from "draft-js";
import { Redirect } from "react-router-dom";

import * as actions from "../../../store/actions/index";
import CreateArticleForm from "../../../components/UI/Article/ArticleForm";
import { successToast } from "../../../components/Toast/toast";

export class CreateArticle extends Component {

    state = {
        editorState: EditorState.createEmpty(),
        articleData: {
            title: "",
            description: "",
            body: "",
            image: null
        },
        error: false,
        titleTouched: false,
        descriptionTouched: false,
        bodyTouched: false,
        disabled: false
    };

    onChangeHandler = (editorState) => {
        this.setState({editorState});
    };

    bodyChangedHandler=( event, editor ) => {
        const data = editor.getData();
        const articleData = {...this.state.articleData};
        articleData.body = data;
        const { body, title, description } = articleData;
        let disableBtn = true;
        if ( !body || body.length < 5 || !title || !description) {
            disableBtn = false
        };

        this.setState({
            articleData,
            disabled: disableBtn
        });
    }

    inputHandler = (e) => {
        const articleData = {...this.state.articleData};
        let titleTouched = false;
        let descriptionTouched = false;
        let bodyTouched = false;
        let disableBtn = true;
        const { name, value, files } = e.target

        if (name === "title") {
            articleData.title = value
            titleTouched = false
        } else if (name === "description") {
            articleData.description = value
            descriptionTouched = false
        };
        const { body, title, description } = articleData

        if (title) {
            disableBtn = title.length > 3 && disableBtn
        };
        if (description) {
            disableBtn = description.length > 3 && disableBtn
        };
        if ( !title || !description || !body) {
            disableBtn = false
        };
        if (files) {
            articleData.image = files[0]
        };

        this.setState ({
            articleData,
            titleTouched,
            descriptionTouched,
            bodyTouched,
            disabled: disableBtn
        });
        e.preventDefault();
    }

    createArticleSubmitHandler = () => {
        let disableBtnAgain = false;
        this.setState({ disabled: disableBtnAgain });
        const {
            image,
            title,
            body,
            description
        } = this.state.articleData;
        const dataToFormData = new FormData();
        if (image !== null) {
            dataToFormData.append("image", image, image.name)
        };
        dataToFormData.append("title", title);
        dataToFormData.append("body", body);
        dataToFormData.append("description", description);

        this.props.onCreateArticle(dataToFormData);
    }

    render() {
        this.isAuthenticated = localStorage.getItem("token") !== null;
        const { loading } = this.props;
        const { title, description, body } = this.state.articleData;

        this.createArticle = (
            <div>
                <CreateArticleForm
                    editorState={this.state.editorState}
                    onChange={this.onChangeHandler}
                    inputChanged={this.inputHandler}
                    submitData={this.createArticleSubmitHandler}
                    buttonAction="Create Article"
                    formTitle="Create an article with Authors Haven"
                    title={title}
                    description={description}
                    body={body}
                    loading={loading}
                    disabled={!this.state.disabled}
                    bodyChanged={this.bodyChangedHandler}
                    onImageUpload={this.inputHandler}
                    />
            </div>
        );
        if (
            this.props.message && this.props.message ===
            "Article created successfully") {
            successToast(this.props.message);
            this.createArticle = (<Redirect to="/" />);
        } else if (!this.isAuthenticated) {
            this.createArticle = (<Redirect to="/login" />);
        };

        return (
            <div>
                {this.createArticle}
            </div>
        );
    }
}

export const mapStateToProps = (state) => {
    return {
        loading: state.article.loading,
        article: state.article.article,
        message: state.article.message
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
        onCreateArticle: (data) => dispatch(actions.createArticle(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateArticle);
