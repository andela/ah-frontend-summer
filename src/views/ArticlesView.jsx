import React from 'react';
import ArticleListContainer from "../containers/Articles/ArticleListContainer";


const ArticlesView = () => (
    <div>
        <ArticleListContainer title="Articles" paginating />
    </div>
);

export default ArticlesView;
