import articleReducer from "../article";

import * as actionTypes from "../../actions/actionTypes";
import {SUCCEEDED} from "../../actions/async";
import {BOOKMARK, UNDO_BOOKMARK} from "../../actions/async/ArticleActions";

describe("Article reducer", () => {
    it("should return initial state if no action", () => {
        expect(articleReducer(undefined, {})).toEqual({
            article: null,
            averageRating: null,
            error: null,
            loading: false,
            message: ""
        });
    });

    it("should return updated state of loading true is action in started", () => {
        expect(articleReducer(undefined, { type: actionTypes.GET_ARTICLE_START })).toEqual({
            article: null,
            averageRating: null,
            error: null,
            loading: true,
            message: ""
        });
    });

    it("reducer should update error in state if action is fail", () => {
        expect(articleReducer(undefined, {
            type: actionTypes.GET_ARTICLE_FAIL,
            error: "article loading"
        })).toEqual({
            article: null,
            averageRating: null,
            error: "article loading",
            loading: false,
            message: ""
        });
    });

    it("should update article value in state if action is success", () => {
        expect(articleReducer(undefined, {
            type: actionTypes.GET_ARTICLE_SUCCESS,
            data: { articles: "successful" }
        })).toEqual({
            article: "successful",
            error: null,
            loading: false,
            message: ""
        });
    });

    it("should update article value in state if action for update article is successful", () => {
        expect(articleReducer(undefined, {
            type: actionTypes.UPDATE_ARTICLE_SUCCESS,
            data: { articles: "updated successfully" }
        })).toEqual({
            article: "updated successfully",
            averageRating: null,
            error: null,
            loading: false,
            message: "Changes saved succefully"
        });
    });

    it("reducer should update error in state if action for updating article is fails", () => {
        expect(articleReducer(undefined, {
            type: actionTypes.UPDATE_ARTICLE_FAIL,
            error: "failed updating"
        })).toEqual({
            article: null,
            averageRating: null,
            error: "failed updating",
            loading: false,
            message: ""
        });
    });

    it("should update article value in state if action for creating article is successful", () => {
        expect(articleReducer(undefined, {
            type: actionTypes.CREATE_ARTICLE_SUCCESS,
            data: { articles: "Article created" }
        })).toEqual({
            article: "Article created",
            averageRating: null,
            error: null,
            loading: false,
            message: "Article created successfully"
        });
    });

    it("reducer should update error in state if action for creating article is fails", () => {
        expect(articleReducer(undefined, {
            type: actionTypes.CREATE_ARTICLE_FAIL,
            error: "failed creating an article"
        })).toEqual({
            article: null,
            averageRating: null,
            error: "failed creating an article",
            loading: false,
            message: ""
        });
    });

    it("should update article value if delete action is dispatched", () => {
        expect(articleReducer(undefined, {
            type: actionTypes.DELETE_ARTICLE,
            data: { articles: "deleted" }
        })).toEqual({
            article: "deleted",
            averageRating: null,
            error: null,
            loading: false,
            message: ""
        });
    });

    it("should return initial state if is action ended", () => {
        expect(articleReducer(undefined, { type: actionTypes.ACTION_ENDED })).toEqual({
            article: null,
            averageRating: null,
            error: null,
            loading: false,
            message: ""
        });
    });

    describe('bookmark tests', () => {
        it("should correctly set favoritesCount, favorited_by, favorited on bookmark success", () => {
            expect(articleReducer({article: {favoritesCount: 0, favorited_by: [], favorited: false}}, {type: BOOKMARK + SUCCEEDED})).toEqual({
                article: {
                    favoritesCount: 1,
                    favorited_by: [""],
                    favorited: true
                }
            });
        });

        it("should correctly set favoritesCount, favorited_by, favorited on undo bookmark success", () => {
            expect(articleReducer({article: {favoritesCount: 2, favorited_by: [""], favorited: true}}, {type: UNDO_BOOKMARK + SUCCEEDED})).toEqual({
                article: {
                    favoritesCount: 1,
                    favorited_by: [],
                    favorited: false
                }
            });
        });
    });
});
