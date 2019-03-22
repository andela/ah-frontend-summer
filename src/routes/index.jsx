import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Layout from '../hoc/layout/Layout';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';
import TagArticlesContainer from '../containers/Tags/TagArticlesContainer';
import SignupView from '../views/Auth/Signup';
import PasswordRequestContainer from '../containers/passwordReset/RequestPasswordReset';
import PasswordResetContainer from '../containers/passwordReset/ResetPassword';

import EmailVerificationView from '../views/Auth/verification';
import ArticlesView from "../views/ArticlesView";
import Article from '../containers/Articles/Article/Article';
import CreateArticle from '../containers/Articles/Article/CreateArticle';
import UpdateArticle from '../containers/Articles/Article/UpdateArticle';
import UserProfileContainer from '../containers/Profiles/UserProfileContainer';

import EditProfileContainer from '../containers/Profiles/EditProfileContainer';
import FollowersFollowing from '../containers/Profiles/FollowersFollowing';
import TagsListContainer from "../containers/Tags/TagsListContainer";


const Routes = () => (
    <Router>
        <div>
            <Switch>
                <Route path="/login" component={LoginView} />
                <Route path="/signup" component={SignupView} />
                <Route path="/forgot-password" component={PasswordRequestContainer} />
                <Route path="/reset-password/:token" component={PasswordResetContainer} />
                <Layout>
                    <ToastContainer />
                    <Switch>
                        <Route path="/" exact component={HomeView} />
                        <Route path="/articles" exact component={ArticlesView} />
                        <Route path="/articles/create" exact component={CreateArticle} />
                        <Route path="/articles/update/:slug" exact component={UpdateArticle} />
                        <Route path="/articles/:slug" exact component={Article} />
                        <Route path="/email-verification/:token" exact component={EmailVerificationView} />
                        <Route exact path="/tags/:tag" component={TagArticlesContainer} />
                        <Route path="/tags" component={TagsListContainer} />
                        <Route exact path="/:username" component={UserProfileContainer} />
                        <Route exact path="/:username/edit" component={EditProfileContainer} />
                        <Route exact path="/:username/followers" component={FollowersFollowing} />
                        <Route exact path="/:username/following" component={FollowersFollowing} />
                    </Switch>
                </Layout>
            </Switch>
        </div>
    </Router>
);

export default Routes;
