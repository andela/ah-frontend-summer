import React from 'react'


const ArticleCard = (props) => {
  return (
    <div>
      <h2>Title: { props.article.title }</h2>
      <h4>Slug: { props.article.slug }</h4>
      <br/>
    </div>
  )
}

export default ArticleCard