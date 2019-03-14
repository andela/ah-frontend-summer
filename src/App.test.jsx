import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import Routes from './routes';
import App from './components/App';
import reducer from "./store/reducers";


const mockStore = createStore(reducer, applyMiddleware(thunk));

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

    it('renders without crashing', ()=> {
        const wrapper =  shallow(<Routes />);
        expect(wrapper).toMatchSnapshot();
    });
});
