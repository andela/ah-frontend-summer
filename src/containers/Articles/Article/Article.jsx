import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom"
import { toast } from "react-toastify";

import * as actions from "../../../store/actions/index";
import ArticleDetails from "../../../components/UI/Article/Article";
import DeleteArticleButtons from "../../../components/UI/Article/DeleteArticle";
import Loader from "../../../components/UI/Loader";
import { dangerToast, infoToast } from "../../../components/Toast/toast";
import Modal from "../../../components/UI/Modal/Modal";
import CommentListContainer from "../../Comments/CommentListContainer";
import RatingContainer from './RatingContainer';
import { successToast } from "../../../components/UI/Toast/toast";
import { dismissMessage } from "../../../store/actions/sync/ReportArticle";

export class Article extends Component {

    state = {
        showModal: false
    }

    componentWillMount() {
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

    isAuthenticated = () => localStorage.getItem("token") !== null;

    likeArticleHandler = () => {
        let slug = this.props.match.params.slug;
        const {
            article,
            onArticleLiked,
            onRevertingLike,
            history
        } = this.props;
        if (!this.isAuthenticated()) {
            history.push('/login');
        } else if (article && article.liked) {
            onRevertingLike(slug);
        } else {
            onArticleLiked(slug);
        };
    }

    dislikeArticleHandler = () => {
        let slug = this.props.match.params.slug;
        const {
            article,
            onArticleDisliked,
            onRevertingDislike,
            history
        } = this.props;
        if (!this.isAuthenticated()) {
            history.push('/login');
        } else if (article && article.disliked) {
            onRevertingDislike(slug);
        } else {
            onArticleDisliked(slug);
        };
    }

    render() {
        this.renderArticle = (<Loader />);
        this.created_at = null;
        this.isAuthor = false;
        this.username = localStorage.getItem("username");
        const { article, loading, error, message, dismissMessage } = this.props;
        this.confirmButtons = null;
        if (this.state.showModal) {
            this.confirmButtons = (
                <DeleteArticleButtons
                    dismissModal={this.closeModalHandler}
                    deleteArticle={this.deleteArticleHandeler} />
            );
        };

        if (article && article.article === "Article has been deleted") {
            infoToast(article.article);
            this.renderArticle = (<Redirect to="/" />);
        } else if (article) {
            if (this.username) {
                this.isAuthor = (this.username ===
                    article.author.username
                    && this.isAuthenticated())
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
                    facebook={article.share_links.facebook}
                    twitter={article.share_links.twitter}
                    email={article.share_links.email}
                    tags={article.tag_list}
                    likes={article.like_count}
                    dislikes={article.dislike_count}
                    userLikesArticle={article.liked}
                    userDislikesArticle={article.disliked}
                    likeArticle={this.likeArticleHandler}
                    dislikeArticle={this.dislikeArticleHandler}
                    hasReported={article.has_reported}
                />
            );
        } else if (error) {
            dangerToast(error.articles.errors);
            this.renderArticle = (<Redirect to="/" />);
        };
        
        if(message){
            successToast(message);
            dismissMessage();
        }

        return (
            <div>
                <Modal
                    show={this.state.showModal}
                    modalClosed={this.closeModalHandler}>{this.confirmButtons}</Modal>
                {this.renderArticle}
                <RatingContainer {...this.props} />
                <CommentListContainer slug={this.props.match.params.slug} />
            </div>
        );
    }
}

export const mapStateToProps = (state) => {
    return {
        article: state.article.article,
        loading: state.article.loading,
        error: state.article.error,
        message: state.reportArticle.message
    };
};

export const mapDispatchToProps = (dispatch) => {
    return {
        onGetArticle: (slug) => dispatch(actions.getArticle(slug)),
        onDeleteArticle: (slug) => dispatch(actions.deleteArticle(slug)),
        onArticleLiked: (slug) => dispatch(actions.likeArticle(slug)),
        onRevertingLike: (slug) => dispatch(actions.revertLike(slug)),
        onArticleDisliked: (slug) => dispatch(actions.dislikeArticle(slug)),
        onRevertingDislike: (slug) => dispatch(actions.revertDislike(slug)),
        dismissMessage: () => dispatch(dismissMessage())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
