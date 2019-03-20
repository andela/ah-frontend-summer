import React from 'react';
import PropTypes from 'prop-types';
import {Button, Container, Header} from "semantic-ui-react";
import {Link} from "react-router-dom";
import ArticleCard from './ArticleCard';
import ListPagination from './ListPagination';

const ArticleList = (props) => {
    const { articles, title, paginating } = props;
    return(
        <Container>
            <div className="article-list">
                <Header color="teal" as="h1">
                    {title}
                </Header>
                {articles.map(article => (
                    <ArticleCard key={article.slug} article={article} />))}
                {paginating ? (
                    <ListPagination {...props} />
                ) : (
                    <Link className="more-articles-button" to="/articles">
                        <Button size="large" basic color="teal">More Articles</Button>
                    </Link>
                )}

                
            </div>
        </Container>
    );

};

ArticleList.propTypes = {
    articles: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    paginating: PropTypes.bool
};

ArticleList.defaultProps = {
    paginating: false
};

export default ArticleList;
