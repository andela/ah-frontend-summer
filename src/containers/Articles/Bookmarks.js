import React from 'react';
import ArticleListContainer from "./ArticleListContainer";
import {getLoggedInUser, URL} from "../../store/actions/async";


const Bookmarks = () => {
    const user = getLoggedInUser(localStorage);
    return (
        <div>
            <ArticleListContainer
                url={`${URL}/articles?favorited_by=${user}`}
                title="Bookmarks"
                paginating />
        </div>
    );
};

export default Bookmarks;
