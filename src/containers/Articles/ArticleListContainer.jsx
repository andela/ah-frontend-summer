import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArticleList from '../../components/article/ArticleList';
import { fetchArticlesAction } from '../../store/actions/async/ArticleActions';
import ArticleLoading from "../../components/article/ArticleLoading";
import ArticleError from "../../components/article/ArticleError";
import {FAILED, SUCCEEDED} from "../../store/actions/async";

export class ArticleListContainer extends Component {

    componentDidMount(){
        this.fetchArticles();
    }

    fetchArticles(){
        const { loading } = this.props;
        if (loading){
            return;
        }
        const { fetchArticles } = this.props;
        fetchArticles();
    }

    render() {
        const { loading, status } = this.props;
        let toRender = '';

        if (loading){
            toRender = <ArticleLoading />;
        }
        else if(status === FAILED){
            toRender = <ArticleError retry={this.fetchArticles} />;
        }
        else if(status === SUCCEEDED){
            toRender= <ArticleList {...this.props} />;
        }

        return (
            <div>
                {toRender}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        articles: state.articles.articles,
        loading: state.articles.loading,
        status: state.articles.status
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArticles : () => dispatch(fetchArticlesAction())
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
