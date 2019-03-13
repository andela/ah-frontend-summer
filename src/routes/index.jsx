import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../components/UI/Header';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';
import SignupView from '../views/Auth/Signup';
import EmailVerificationView from '../views/Auth/verification';

const Routes = () => (
    <Router>
        <div>
            <Header />
            <Route path="/" exact component={HomeView} />
            <Route path="/email-verification/:token" exact component={EmailVerificationView} />
            <Route path="/login" component={LoginView} />
            <Route path="/signup" component={SignupView} />
        </div>
    </Router>
);

export default Routes;
