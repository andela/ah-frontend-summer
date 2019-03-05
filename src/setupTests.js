import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import jest_fetch_mock from "jest-fetch-mock";

// configure an adapter to help interface enzyme with our version
// of react
configure({ adapter: new Adapter() });

// mock the global fetch api during tests
global.fetch = jest_fetch_mock;
