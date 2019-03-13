import React from 'react'
import ArticleCard from './ArticleCard';
import { Item } from "semantic-ui-react"

const ArticleList = (props) => {

    return(
        <Item.Group>
        {props.articles.map(article => (

            <ArticleCard key={article.slug} article={article} />))}
        </Item.Group>

    );

}

export default ArticleList