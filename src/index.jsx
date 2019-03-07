import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import * as serviceWorker from './serviceWorker';
import store from "./store";
import './styles/index.css';
import Routes from "./routes";


ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
serviceWorker.unregister();
