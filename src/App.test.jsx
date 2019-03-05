import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Routes from './routes';
import App from './components/App';


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Routes />, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe('App rendering tests', () => {
    it('renders without crashing', () => {
        shallow(<App />);
    });
    it('renders consistently', () => {
        const wrapper = shallow(<App />);
        expect(wrapper).toMatchSnapshot();
    });
});
