import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from '../hoc/layout/Layout';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';


const Routes = () => (
    <Router>
        <div>
            <Switch>
                <Route path="/login" component={LoginView} />
                <Route path="/signup" component={LoginView} />
                <Layout>
                    <Route path="/" exact component={HomeView} />
                    <Route path="/tags" component={LoginView} />
                </Layout>
            </Switch>
        </div>
    </Router>
);

export default Routes;
