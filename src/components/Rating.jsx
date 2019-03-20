import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import StarRatingComponent from 'react-star-rating-component';

import '../styles/Articles.scss';

const Rating = props => {
    const {
        rateScore,
        onStarClick,
        averageRating
    } = props;

    const isLoggedIn = localStorage.getItem('token');

    return (
        <div>
            {isLoggedIn ? (
                <Container textAlign="right">
                    <StarRatingComponent
                        name="rating"
                        value={rateScore}
                        starCount={5}
                        starColor="#008080"
                        emptyStarColor="grey"
                        onStarClick={onStarClick}
                        className="rating-stars"
                    />
                </Container>
            ) : ""}

            <Container textAlign="right">
                <span>
                    Average Rates:
                    {averageRating}
                </span>
            </Container>

        </div>
    );
};
Rating.defaultProps = {
    rateScore: 0,
    averageRating: 0,
    onStarClick: () => {}
};

Rating.propTypes = {
    rateScore: PropTypes.number,
    onStarClick: PropTypes.func,
    averageRating: PropTypes.number
};

export default Rating;
