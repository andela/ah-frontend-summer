import React from 'react'
import { Item, Container } from "semantic-ui-react"
import oneArticle from '../../assets/images/oneArticle.jpg';


const ArticleCard = (props) => {
  return (
    <div>
      {/* <h2>Title: { props.article.title }</h2>
      <h4>Slug: { props.article.slug }</h4> */}
    <Item>
      <Item.Image size='medium' src={oneArticle} />


      <Item.Content>
        <Item.Header as='a'>{ props.article.title }</Item.Header>
        <Item.Description>
          <p>Many people also have their own barometers for what makes a cute dog.t makes a cute dog</p>
        </Item.Description>
      </Item.Content>
    </Item>
    <br/><br/>
    </div>
  )
}

export default ArticleCard