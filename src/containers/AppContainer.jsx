/**
 * Hold and provide store to the stateless App component
 */
import React, { Component } from 'react';
import {connect} from "react-redux";
import App from "../components/App";

class AppContainer extends Component{
    render() {
        return <App />;
    }
}

const mapStateToProps = (state) => {
    return {
        // TODO We'll pass props to the component, from the store, like this
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        // TODO We'll allow the component to dispatch actions via these methods
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
