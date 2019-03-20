import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Layout from '../hoc/layout/Layout';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';
import SignupView from '../views/Auth/Signup';
import EmailVerificationView from '../views/Auth/verification';
import ArticlesView from "../views/ArticlesView";
import Article from '../containers/Articles/Article/Article';
import CreateArticle from '../containers/Articles/Article/CreateArticle';
import UpdateArticle from '../containers/Articles/Article/UpdateArticle';


const Routes = () => (
    <Router>
        <div>
            <Switch>
                <Route path="/login" component={LoginView} />
                <Route path="/signup" component={SignupView} />
                <Layout>
                    <Route path="/" exact component={HomeView} />
                    <Switch>
                        <Route path="/articles" exact component={ArticlesView} />
                        <Route path="/articles/create" exact component={CreateArticle} />
                        <Route path="/articles/update/:slug" exact component={UpdateArticle} />
                        <Route path="/articles/:slug" component={Article} />
                    </Switch>
                    <Route path="/tags" component={CreateArticle} />
                    <Route path="/email-verification/:token" exact component={EmailVerificationView} />
                    <ToastContainer />
                </Layout>
            </Switch>
        </div>
    </Router>
);

export default Routes;
