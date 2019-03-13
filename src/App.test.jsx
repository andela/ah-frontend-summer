import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import reducer from "./store/reducers";
import Routes from './routes';
import App from './components/App';


const mockStore = createStore(
    reducer, // , pass in the main reducer
    applyMiddleware(thunk) // , apply any middleware we are making use of
);

describe('App rendering tests', () => {
    it('app renders without crashing', () => {
        shallow(<App />);
    });

    it('renders consistently', () => {
        const wrapper = shallow(<App />);
        expect(wrapper).toMatchSnapshot();
    });
    it('renders without crashing', () => {
        const wrapper = shallow(<Routes />);
        expect(wrapper).toMatchSnapshot();
    });

    it('routes render without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Provider store={mockStore}><Routes /></Provider>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
