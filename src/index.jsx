import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import "semantic-ui-css/semantic.min.css";
import * as serviceWorker from './serviceWorker';
import store from "./store";
import './styles/index.scss';
import Routes from "./routes";

// mount a component passed to this function
const render = Component => {
    return ReactDOM.render(
        <Provider store={store}>
            <Component />
        </Provider>,
        document.getElementById('root')
    );
};

// by default, we render the routes component, which is the default
// app component in our case
render(Routes);

// if we are in development though, HMR is on
// so we can go ahead and render the same component, but with HMR supported
if (module.hot) {
    module.hot.accept('./routes', () => {
        const NextRoutes = require('./routes').default;
        render(NextRoutes);
    });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
serviceWorker.unregister();
