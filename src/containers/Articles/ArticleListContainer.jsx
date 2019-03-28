import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Container} from "semantic-ui-react";
import ArticleList from '../../components/article/ArticleList';
import { fetchArticlesAction } from '../../store/actions/async/ArticleActions';
import ArticleLoading from "../../components/article/ArticleLoading";
import ArticleError from "../../components/article/ArticleError";
import {FAILED, SUCCEEDED} from "../../store/actions/async";
import {URL} from "../../store/actions/async/CommentActions";

export class ArticleListContainer extends Component {

    componentDidMount(){
        this.fetchArticles();
    }
    fetchArticles = () => {
        const { loading, url } = this.props;
        if (loading){
            return;
        }
        const { fetchArticles } = this.props;
        fetchArticles(url);
    };
    render() {
        const { loading, status, url } = this.props;
        let toRender;

        if (loading){
            toRender = <ArticleLoading />;
        }
        else if(status === FAILED){
            toRender = <ArticleError retry={this.fetchArticles} />;
        }
        else if(status === SUCCEEDED){
            toRender= <ArticleList url={url} {...this.props} />;
        }
        else{
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
        fetchArticles : url => dispatch(fetchArticlesAction(url))
    };
};

ArticleListContainer.propTypes = {
    loading: PropTypes.bool,
    status: PropTypes.string.isRequired,
    fetchArticles : PropTypes.func.isRequired,
    url: PropTypes.string
};

ArticleListContainer.defaultProps = {
    loading: true,
    url: `${URL}/articles`
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListContainer);
