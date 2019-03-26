import React from 'react';
import { shallow } from 'enzyme';
import { ReportArticle } from '../ReportArticle';

describe('Report Article', () => {
    const onSubmitHandlerMock = jest.fn();
    const onChangeHandlerMock = jest.fn();
    const props = {
        onSubmitHandler: onSubmitHandlerMock,
        onChangeHandler: onChangeHandlerMock,
        slug: "aska",
        reason: ''
    }
    const wrapper = shallow(<ReportArticle {...props}/>);

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('calls onSubmitHandler on form submission', () => {
        wrapper.find('Form').simulate('submit');
        expect(onSubmitHandlerMock).toHaveBeenCalled();
    });

    it('calls onChangeHandler when a radio button is checked', () => {
        wrapper.find('Radio[name="spam"]').simulate('change');
        expect(onChangeHandlerMock).toHaveBeenCalled();
    });
});
