import React from 'react'

const ArticleCard = (props) => {
  return (
    <div>
      <h2>Id: { props.article.id }</h2>
      <h2>Title: { props.article.title }</h2>
    </div>
  )
}

export default ArticleCard