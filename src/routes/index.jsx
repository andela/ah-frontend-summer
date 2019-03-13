import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';

const Routes = () => (
    <Router>
        <div>
            <Route path="/" exact component={HomeView} />
            <Route path="/login" component={LoginView} />
        </div>
    </Router>
);

export default Routes;
