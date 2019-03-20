import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Rating from '../../../components/Rating';
import updateRateValue  from '../../../store/actions/async/rate';


export class RatingContainer extends Component {
    state = {
        rateScore: 0
    }
    static defaultProps = {
        rateScore: 0,
        match: {},
        rate: {},
        onStarClick: () => { },
        averageRating: 0
    };
    
    onStarClick = (nextValue) => {
        const { 
            match: {params: {slug}} = {params: {}},
            rate} = this.props;
        const url =
            `https://ah-backend-summer-staging.herokuapp.com/api/v1/articles/${slug}/rate`;
        this.setState({ rateScore: nextValue });
        const data = { rate_score: nextValue };
        const payload = {
            data,
            url
        };
        rate(payload);
    }
    render() {
        const { rateScore } = this.state;
        const {
            averageRating
        } = this.props;

        const ratingProps = {
            rateScore,
            onStarClick: this.onStarClick,
            averageRating
        };
        return (
            <div>
                <Rating {...ratingProps} />
            </div>
        );

    }

}
export const mapDispatchToProps = dispatch => {
    return {
        rate: payload => dispatch(updateRateValue(payload))
    };
};

export const mapStateToProps = state => {
    return {
        averageRating: state.article.averageRating
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RatingContainer);

RatingContainer.propTypes = {
    rate: PropTypes.func,
    rateScore: PropTypes.number,
    onStarClick: PropTypes.func,
    averageRating: PropTypes.number,
    match: PropTypes.object
};
