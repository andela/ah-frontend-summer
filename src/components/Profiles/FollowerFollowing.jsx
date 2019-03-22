import React from 'react';
import { Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import User from './User';

const FollowerFollowing = props => {
    const { 
        location: { pathname } = {}, 
        profile: { followers } = {},
        profile: { followings } = {},
        match: { params: { username} } = { params: {} }
    } = props;
    const users = pathname === `/${username}/followers` ? followers : followings;
    let title;
    let noUsers;
    if (pathname === `/${username}/followers`){ 
        title = `${username} Followers`;
        noUsers = `${username} has no followers yet`;
    }

    if (pathname === `/${username}/following`){ 
        title = `${username} Following`;
        noUsers = `${username} is not following anybody yet`;
    }

    return (
        <Container centered>
            <h1>{title}</h1>
            {!users || users.length === 0 ? <h3>{noUsers}</h3> : users.map(user => (
                <User key={user} user={user} />
            ))}
        </Container>
    );
};

FollowerFollowing.propTypes = {
    profile: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
};

export default FollowerFollowing; 
