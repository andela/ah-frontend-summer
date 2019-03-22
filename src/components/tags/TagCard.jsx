import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../styles/tags.scss';

const TagCard = props => {
    const {
        tag
    } = props;
    return (
        <Link to={`/tags/${tag}`}>
            <Button 
                compact 
                className="tag-button"
            >
                {tag}
            </Button>
        </Link>
    );
};

TagCard.propTypes = {
    tag: PropTypes.string.isRequired,
};

export default TagCard;
