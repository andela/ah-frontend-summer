import React from 'react';
import ArticlesListContainer from "../containers/articles/ArticlesListContainer";
import BannerContainer from "../containers/BannerContainer";


const HomeView = () => (
    <div>
        <BannerContainer />
        <ArticlesListContainer />
    </div>
);

export default HomeView;
