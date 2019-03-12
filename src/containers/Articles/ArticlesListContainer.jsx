import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArticleList from '../../components/article/ArticleList';
import { fetchArticlesAction } from '../../store/actions/async/ArticleActions';

class ArticlesList extends Component {

  componentDidMount(){
    return this.props.fetchArticles()
  }

  render() {
    return (
      <div>
        < ArticleList articles = {this.props.articles} />
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    articles: state.articles.articles
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
      fetchArticles : () => dispatch(fetchArticlesAction())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);