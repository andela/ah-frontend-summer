import React from 'react';
import BannerContainer from "../containers/BannerContainer";
import ArticlesListContainer from "../containers/Articles/ArticleListContainer";


const HomeView = () => (
    <div>
        <BannerContainer />
        <ArticlesListContainer title="Recent Articles" paginating={false} />
    </div>
);

export default HomeView;
