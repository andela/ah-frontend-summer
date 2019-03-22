import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from "semantic-ui-react";
import ArticleList from '../../components/article/ArticleList';
import fetchTagFiltersAction from '../../store/actions/async/TagFiltersActions';
import ArticleLoading from "../../components/article/ArticleLoading";
import ArticleError from "../../components/article/ArticleError";
import { FAILED, SUCCEEDED } from "../../store/actions/async";

export class TagArticlesContainer extends Component {

    componentDidMount() {
        this.fetchArticles();
    }
    fetchArticles = () => {
        const { loading, match } = this.props;
        if (loading) {
            return;
        }
        this.tag = match.params.tag;
        const url = `https://ah-backend-summer-staging.herokuapp.com/api/v1/articles/?tag=${this.tag}`;
        const { fetchArticles } = this.props;
        fetchArticles(url);
    };
    render() {
        const { loading, status } = this.props;
        let toRender;

        if (loading) {
            toRender = <ArticleLoading />;
        }
        else if (status === FAILED) {
            toRender = <ArticleError retry={this.fetchArticles} />;
        }
        else if (status === SUCCEEDED) {
            toRender = <ArticleList {...this.props} title={`${this.tag} articles`} paginating />;
        }
        else {
            toRender = 'Could not load Articles';
        }

        return (
            <Container>
                {toRender}
            </Container>
        );
    }
}

const mapStateToProps = state => {
    const { articles,
        loading,
        status,
        articleCount,
        nextPage,
        prevPage
    } = state.articles;
    return {
        articles,
        loading,
        status,
        articleCount,
        nextPage,
        prevPage
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchArticles: url => dispatch(fetchTagFiltersAction(url))
    };
};

TagArticlesContainer.propTypes = {
    loading: PropTypes.bool,
    status: PropTypes.string.isRequired,
    fetchArticles: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired
};

TagArticlesContainer.defaultProps = {
    loading: true,
};

export default connect(mapStateToProps, mapDispatchToProps)(TagArticlesContainer);
