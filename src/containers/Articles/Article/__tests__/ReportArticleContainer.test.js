import React from 'react';
import { shallow } from 'enzyme';
import { ReportArticleContainer } from '../ReportArticleContainer';

describe('Report Article Container', () => {
    const reportArticleMock = jest.fn();
    const props = {
        reportArticle: reportArticleMock,
        match: { params: { slug: "fsd"} },
        history: {}
    }
    const wrapper = shallow(<ReportArticleContainer {...props} />);
    const wrapperInstance = wrapper.instance();

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('onChangeHandler updates value of reason in state', () => {
        wrapperInstance.onChangeHandler({}, { value: 'okay' });
        expect(wrapper.state().reason).toBe('okay');
    });

    it('onSubmithandler calls reportArticle function', () => {
        wrapperInstance.onSubmitHandler({ preventDefault: jest.fn() });
        expect(reportArticleMock).toHaveBeenCalled();
    });
});
