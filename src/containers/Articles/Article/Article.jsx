import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom"
import { toast } from "react-toastify";

import * as actions from "../../../store/actions/index";
import ArticleDetails from "../../../components/UI/Article/Article";
import DeleteArticleButtons from "../../../components/UI/Article/DeleteArticle";
import Loader from "../../../components/UI/Loader";
import {dangerToast, infoToast } from "../../../components/Toast/toast";
import Modal from "../../../components/UI/Modal/Modal";

export class Article extends Component {

    state = {
        showModal: false
    }

    componentWillMount(){
        this.props.onGetArticle(this.props.match.params.slug);
    }

    deleteArticleHandeler = () => {
        toast.dismiss();
        this.props.onDeleteArticle(this.props.match.params.slug);
    }

    showModalHandeler = () => {
        this.setState({ showModal: true });
    }

    closeModalHandler = () => {
        this.setState({ showModal: false });
    }

    render() {
        this.renderArticle = ( <Loader /> );
        this.created_at = null;
        this.isAuthor = false;
        this.isAuthenticated = localStorage.getItem("token") !== null;
        this.username = localStorage.getItem("username");
        const { article, loading, error } = this.props;
        this.confirmButtons = null;
        if (this.state.showModal) {
            this.confirmButtons = (
                <DeleteArticleButtons
                    dismissModal={this.closeModalHandler}
                    deleteArticle={this.deleteArticleHandeler}/>
            );
        };

        if ( article && article.article === "Article has been deleted") {
            infoToast(article.article);
            this.renderArticle = (<Redirect to="/"/>);
        } else if (article) {
            if (this.username) {
                this.isAuthor = ( this.username ===
                    article.author.username
                    && this.isAuthenticated)
            };
            this.created_at = article.created_at.substr(0,
                article.created_at.indexOf("T"));
            this.renderArticle = (
                <ArticleDetails
                    title={article.title}
                    author={article.author.username}
                    body={article.body}
                    readTime={article.read_time}
                    deleteArticle={this.showModalHandeler}
                    slug={this.props.match.params.slug}
                    loading={loading}
                    dateCreated={this.created_at}
                    isAuthor={this.isAuthor}
                    image={article.image}
                    />);
        } else if ( error ) {
            dangerToast(error.articles.errors);
            this.renderArticle = (<Redirect to="/"/>);
        };

        return (
            <div>
                <Modal
                show={this.state.showModal}
                modalClosed={this.closeModalHandler}>{this.confirmButtons}</Modal>
                {this.renderArticle}
            </div>
        );
    }
}

export const mapStateToProps = (state) => {
    return {
        article: state.article.article,
        loading: state.article.loading,
        error: state.article.error
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
        onGetArticle: (slug) => dispatch(actions.getArticle(slug)),
        onDeleteArticle: (slug) => dispatch(actions.deleteArticle(slug))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
