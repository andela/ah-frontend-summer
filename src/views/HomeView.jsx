import React from 'react';
import ArticleListContainer from "../containers/Articles/ArticleListContainer";
import BannerContainer from "../containers/BannerContainer";


const HomeView = () => (
    <div>
        <BannerContainer />
        <ArticleListContainer title="Recent Articles" paginating={false} />
    </div>
);

export default HomeView;
