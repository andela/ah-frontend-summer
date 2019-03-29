import React from 'react';
import ArticleListContainer from "../containers/Articles/ArticleListContainer";
import {URL} from "../store/actions/async";


const ArticlesView = () => (
    <div>
        <ArticleListContainer url={`${URL}/articles`} title="Articles" paginating />
    </div>
);

export default ArticlesView;
