import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reportArticle } from '../../../store/actions/async/ReportArticle';
import ReportArticle from '../../../components/UI/Article/ReportArticle';

export class ReportArticleContainer extends Component {
    state = {
        reason: ''
    };

    onChangeHandler = (e, { value }) => this.setState({ reason: value });

    onSubmitHandler = e => {
        e.preventDefault();
        const { 
            reportArticle, 
            match: { params: { slug } = {} } = {}, 
            history: { push } = {}
        } = this.props;
        const { reason } = this.state;
        const token = localStorage.getItem('token');
        const data = { reason }; 
        reportArticle({ token, data, slug, push });
    };

    render() {
        const { reason } = this.state;
        const { match: { params: { slug } = {} } = {} } = this.props;
        const reportArticleProps = {
            onSubmitHandler: this.onSubmitHandler,
            onChangeHandler: this.onChangeHandler,
            slug,
            reason
        };
        return <ReportArticle {...reportArticleProps}/>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reportArticle: payload => dispatch(reportArticle(payload))
    };
};

ReportArticleContainer.propTypes = {
    reportArticle: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default connect(null, mapDispatchToProps)(ReportArticleContainer);
