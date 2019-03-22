import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import jest_fetch_mock from "jest-fetch-mock";

import storage from 'jest-localstorage-mock';


// configure an adapter to help interface enzyme with our version
// of react
configure({ adapter: new Adapter() });

class FormDataMock {
    constructor(){
        this.append = jest.fn();
    };
};

// mock the global fetch api during tests
global.fetch = jest_fetch_mock;
global.localStorage = storage;
global.FormData = FormDataMock;
