import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import Bookmark from "../../../components/article/Bookmark";
import {
    bookmarkAction,
    undoBookmarkAction
} from "../../../store/actions/async/ArticleActions";
import {isLoggedIn} from "../../../store/actions/async";

export class BookmarkContainer extends Component{
    bookmarkArticle = () => {
        const {history} = this.props;
        const loggedIn = isLoggedIn(localStorage);
        if (!loggedIn){
            history.push('/login');
        }
        else{
            this.triggerBookmark();
        }
    };

    triggerBookmark = () => {
        const {bookmark, undoBookmark, isBookmarked, slug, loading} = this.props;

        if (!loading){
            if (isBookmarked){
                undoBookmark(slug);
            }
            else {
                bookmark(slug);
            }
        }
    };

    render() {
        const {loading, isBookmarked} = this.props;
        return (
            <Bookmark
                loading={loading}
                bookmark={() => {this.bookmarkArticle();}}
                isBookmarked={isBookmarked} />
        );
    }
}

export const mapStateToProps = (state) => {
    const {loading, status} = state.progress.bookmark;
    const {favorited: isBookmarked} = state.article.article;
    return {loading, status, isBookmarked: isBookmarked};
};

export const mapDispatchToProps = (dispatch) => {
    return {
        bookmark: (slug) => {
            dispatch(bookmarkAction(slug));
        },
        undoBookmark: (slug) => {
            dispatch(undoBookmarkAction(slug));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookmarkContainer));

BookmarkContainer.propTypes = {
    bookmark: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    isBookmarked: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    slug: PropTypes.string.isRequired,
    undoBookmark: PropTypes.func.isRequired
};
