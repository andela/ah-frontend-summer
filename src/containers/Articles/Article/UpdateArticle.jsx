import React, { Component } from "react";
import { connect } from "react-redux";
import { EditorState } from "draft-js";
import { Redirect } from "react-router-dom";

import { successToast } from "../../../components/Toast/toast";
import * as actions from "../../../store/actions/index";
import CreateArticleForm from "../../../components/UI/Article/ArticleForm";

export class UpdateArticle extends Component {

    state = {
        editorState: EditorState.createEmpty(),
        articleData: {
            title: "",
            description: "",
            body: "",
            image: null
        },
        disabled: false
    }

    componentDidMount() {
        const articleData = { ...this.state.articleData };
        if (this.props.article) {
            const { title, description, body, image } = this.props.article;
            articleData.title = title;
            articleData.description = description;
            articleData.body = body;
            articleData.image = image;
            this.setState({
                articleData
            });
        };
    }

    bodyChangedHandler = (event, editor) => {
        const data = editor.getData();
        const articleData = { ...this.state.articleData };
        let disableBtn = true;
        articleData.body = data;
        const { title, description, body } = articleData

        if ( !title || !description || !body) {
            disableBtn = false
        };
        if (!body || body.length < 5) {
            disableBtn = false
        };

        this.setState({
            articleData,
            disabled: disableBtn
        });
    }

    inputHandler = (e) => {
        const articleData = { ...this.state.articleData };
        let disableBtn = true;
        const { value, name, files } = e.target

        if (name === "title") {
            articleData.title = value
        } else if (name === "description") {
            articleData.description = value
        };
        const { body, title, description } = articleData

        if ( !body || body < 5 || !title || !description) {
            disableBtn = false
        };
        if (files) {
            articleData.image = files[0]
        };

        this.setState({
            articleData,
            disabled: disableBtn
        });
        e.preventDefault();
    }

    updateArticleHandler = () => {
        const dataToFormData = new FormData();
        const {
            image,
            title,
            body,
            description
        } = this.state.articleData
        if (image) {
            dataToFormData.append("image", image, image.name);
        };
        dataToFormData.append("title", title);
        dataToFormData.append("body", body);
        dataToFormData.append("description", description);

        this.props.onUpdateArticle(this.props.match.params.slug, dataToFormData);

        if (!this.props.loading) {
            successToast("Changes have been saved successfully");
            this.props.history.push(`/articles/${this.props.match.params.slug}`);
        };
    }

    render() {
        const { title, description, body } = this.state.articleData;

        this.updateForm = (
            <div>
                <CreateArticleForm
                    editorState={this.state.editorState}
                    inputChanged={this.inputHandler}
                    submitData={this.updateArticleHandler}
                    title={title}
                    description={description}
                    body={body}
                    loading={this.props.loading}
                    bodyChanged={this.bodyChangedHandler}
                    formTitle="Update Article"
                    buttonAction="Save Changes"
                    disabled={!this.state.disabled}
                    onImageUpload={this.inputHandler}
                />
            </div>
        );

        if (this.props.article === null) {
            this.updateForm = (<Redirect to="/" />);
        };

        return (
            <div>
                {this.updateForm}
            </div>
        );
    }
}

export const mapStateToProps = (state) => {
    return {
        article: state.article.article,
        loading: state.article.loading
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateArticle: (slug, data) => dispatch(actions.updateArticle(slug, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateArticle);
