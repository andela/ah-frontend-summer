import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from '../hoc/layout/Layout'
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';
import SignupView from '../views/Auth/Signup';
import EmailVerificationView from '../views/Auth/verification';
import ArticlesView from "../views/ArticlesView";


const Routes = () => (
    <Router>
        <div>
            <Switch>
                <Route path="/login" component={LoginView} />
                <Route path="/signup" component={SignupView} />
                <Layout>
                    <Route path="/" exact component={HomeView} />
                    <Route path="/articles" exact component={ArticlesView} />
                    <Route path="/tags" component={LoginView} />
                    <Route path="/email-verification/:token" exact component={EmailVerificationView} />
                </Layout>
            </Switch>
        </div>
    </Router>
);

export default Routes;
