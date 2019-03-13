import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArticleList from '../../components/article/ArticleList';
import { fetchArticlesAction } from '../../store/actions/async/ArticleActions';
import ArticleLoading from "../../components/article/ArticleLoading";

export class ArticleListContainer extends Component {

    componentDidMount(){
        const { fetchArticles } = this.props;
        fetchArticles();
    }

    render() {
        const { loading } = this.props;

        return (
            <div>
                {loading ? <ArticleLoading /> : <ArticleList {...this.props} />}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        articles: state.articles.articles,
        loading: state.articles.loading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchArticles : () => dispatch(fetchArticlesAction())
    };
};

ArticleListContainer.propTypes = {
    loading: PropTypes.bool,
    fetchArticles : PropTypes.func.isRequired
};

ArticleListContainer.defaultProps = {
    loading: true
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleListContainer);
