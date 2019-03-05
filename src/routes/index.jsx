import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../components/UI/Header';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';

const Routes = () => (
    <Router>
        <div>
            <Header />
            <Route path="/" exact component={HomeView} />
            <Route path="/login" component={LoginView} />
        </div>
    </Router>
);

export default Routes;
