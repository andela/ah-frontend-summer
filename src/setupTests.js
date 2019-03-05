// this file has the global setup for all our tests
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

// configure an adapter to help interface enzyme with our version
// of react
configure({ adapter: new Adapter() });
