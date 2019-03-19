import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Container} from "semantic-ui-react";
import ArticleList from '../../components/article/ArticleList';
import { fetchArticlesAction } from '../../store/actions/async/ArticleActions';
import ArticleLoading from "../../components/article/ArticleLoading";
import ArticleError from "../../components/article/ArticleError";
import {FAILED, SUCCEEDED} from "../../store/actions/async";

export class ArticleListContainer extends Component {

    componentDidMount(){
        this.fetchArticles();
    }
    fetchArticles = () => {
        const { loading } = this.props;
        if (loading){
            return;
        }
        const url = 'https://ah-backend-summer-staging.herokuapp.com/api/v1/articles';
        const { fetchArticles } = this.props;
        fetchArticles(url);
    };
    render() {
        const { loading, status } = this.props;
        let toRender;

        if (loading){
            toRender = <ArticleLoading />;
        }
        else if(status === FAILED){
            toRender = <ArticleError retry={this.fetchArticles} />;
        }
        else if(status === SUCCEEDED){
            toRender= <ArticleList {...this.props} />;
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
    fetchArticles : PropTypes.func.isRequired
};

ArticleListContainer.defaultProps = {
    loading: true,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListContainer);
