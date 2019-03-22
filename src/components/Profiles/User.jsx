import React from 'react';
import { List, Image, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const User = ({ user }) => {
    return (
        <Container>
            <Image 
                avatar 
                src="https://res.cloudinary.com/dr2bl3izo/image/upload/v1/media/profile/author-blog-businesswoman-267569_ztxab2"
            />
            <Link to={`/${user}`}>
                <List.Header as="a">{user}</List.Header>
            </Link>
        </Container>
    );
};

User.propTypes = {
    user: PropTypes.string.isRequired,
};

export default User;
