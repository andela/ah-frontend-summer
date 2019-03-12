import React from 'react'
import ArticleCard from './ArticleCard';

const ArticleList = (props) => {

    return(
    <div>
        {props.articles.map(article => (
        <ArticleCard key={article.id} article={article} />))}
    </div>
    );

}

export default ArticleList