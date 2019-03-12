import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArticleList from '../../components/article/ArticleList';

class ArticlesList extends Component {

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
    articles: state.articles
  };
};

export default connect(mapStateToProps)(ArticlesList);