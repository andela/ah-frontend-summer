import React from 'react';
import ArticlesListContainer from "../containers/Articles/ArticleListContainer";


const HomeView = () => (
    <div>
        <ArticlesListContainer title="Recent Articles" paginating={false} />
    </div>
);

export default HomeView;
