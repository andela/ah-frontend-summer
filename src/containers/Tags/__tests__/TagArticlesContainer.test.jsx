import {mount, shallow, render} from "enzyme";
import React from "react";
import { TagArticlesContainer } from "../TagArticlesContainer";
import ArticleList from "../../../components/article/ArticleList";
import ArticleLoading from "../../../components/article/ArticleLoading";
import ArticleCard from "../../../components/article/ArticleCard";
import {FAILED, SUCCEEDED} from "../../../store/actions/async";
import ArticleError from "../../../components/article/ArticleError";

const article = {
    "slug": "test",
    "title": "test",
    "description": "test",
    "created_at": "2019-02-20T11:42:32.015391+03:00",
    "updated_at": "2019-02-20T11:42:32.015442+03:00",
    "body": "test",
    "author": {
        "username": "test",
        "first_name": null,
        "last_name": null,
        "bio": null,
        "image": "https://res.cloudinary.com/dr2bl3izo/image/upload/v1/media/author.jpg",
        "following": false,
        "date_of_birth": null
    },
    "image": null,
    "like_count": 0,
    "dislike_count": 1,
    "favorited_by": [],
    "favoritesCount": 0,
    "favorited": false,
    "average_ratings": 0,
    "tag_list": [],
    "read_time": "1 min read",
    "share_links": {
        "google_plus": "https://plus.google.com/share?url=http://ah-backend-summer-staging.herokuapp.com/api/v1/articles/the-future-is-coming-e-rtexlu7",
        "twitter": "https://twitter.com/home?status=The%20future%20is%20coming-e%20by%20fahdjamy%20http://ah-backend-summer-staging.herokuapp.com/api/v1/articles/the-future-is-coming-e-rtexlu7",
        "facebook": "https://www.facebook.com/sharer/sharer.php?u=http://ah-backend-summer-staging.herokuapp.com/api/v1/articles/the-future-is-coming-e-rtexlu7",
        "email": "mailto:?&subject=The%20future%20is%20coming-e&body=I%20am%20sharing%20this%20article%2C%20'The%20future%20is%20coming-e'%20http://ah-backend-summer-staging.herokuapp.com/api/v1/articles/the-future-is-coming-e-rtexlu7"
    },
    "read_stats": 2
};

describe('TagArticles Container Tests', () => {
    let match = {
        params:{tag:'gym'}
    };
    it('renders correctly when loading', () => {
        let wrapper = shallow(<TagArticlesContainer title="test" status={SUCCEEDED} loading fetchArticles={jest.fn()} articles={[article, article]} match={match} />);
        expect(wrapper.exists(ArticleLoading)).toBeTruthy();
    });

    it('renders correctly when status is succeeded', () => {
        let wrapper = shallow(<TagArticlesContainer title="test" status={SUCCEEDED} loading={false} fetchArticles={() => {}} articles={[article, article]} match={match} />);
        expect(wrapper.exists(ArticleList)).toBeTruthy();
    });

    it('renders correctly when status is failed', () => {
        let wrapper = shallow(<TagArticlesContainer title="test" status={FAILED} loading={false} fetchArticles={() => {}} articles={[article, article]} match={match} />);
        expect(wrapper.exists(ArticleError)).toBeTruthy();
    });
});
