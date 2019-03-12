import React from 'react';
import AppContainer from "../containers/AppContainer";
import ArticlesListContainer from "../containers/articles/ArticlesListContainer";
import Banner from "../components/landingPageBanner/Banner";


const HomeView = () => (
    <div>
        <Banner />
        <ArticlesListContainer />
    </div>
);

export default HomeView;
