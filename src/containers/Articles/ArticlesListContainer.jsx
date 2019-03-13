import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArticleList from '../../components/article/ArticleList';
import { fetchArticlesAction } from '../../store/actions/async/ArticleActions';
import ArticleLoading from "../../components/article/ArticleLoading";

class ArticlesList extends Component {

    componentDidMount(){
        const { fetchArticles } = this.props;
        return fetchArticles();
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

ArticlesList.propTypes = {
    loading: PropTypes.bool,
    fetchArticles : PropTypes.func.isRequired
};

ArticlesList.defaultProps = {
    loading: true
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);
