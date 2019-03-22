import React from 'react';
import { 
    Container, 
    Grid, 
    Image, 
    Button, 
    Segment, 
    Message 
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ArticleList from '../article/ArticleList';
import '../../assets/styles/Profile.scss';

export const UserProfile = props => {
    const { profileState, articlesState, onDismissHandler } = props;
    const { profile, profileUpdateMessage } = profileState;
    const { articles } = articlesState;
    const username = localStorage.getItem("username");
    const editButton = username === profile.username ? 
        (
            <Link to={`/${profile.username}/edit`}>
                <Button basic color='teal' floated="right">Edit Profile</Button>
            </Link> 
        ) : null;
    const name = profile.first_name || profile.last_name ? 
        `${profile.first_name} ${profile.last_name}` : profile.username;
    const successfulProfileUpdate = profileUpdateMessage ? 
        (
            <Message 
                onDismiss={onDismissHandler} 
                content={profileUpdateMessage} 
                positive 
            />
        ) : null;

    return (
        <Segment loading={profileState.loading || articlesState.loading}>
            <Container text>
                {successfulProfileUpdate}
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={9} className="ProfileEdit">
                            <h2>{name}</h2>
                            {editButton}
                            <h3>{profile.bio}</h3>
                            <Link to={`/${profile.username}/followers`}>
                                <span>
                                    {profile.number_of_followers} 
                                    &nbsp;
                                    Followers
                                </span>
                            </Link>
                            <Link to={`/${profile.username}/following`}>
                                <span>
                                    {profile.number_of_following}
                                    &nbsp; 
                                    Following
                                </span>
                            </Link>
                        </Grid.Column>
                        <Grid.Column width={4} floated="right">
                            <Image 
                                src={profile.image} 
                                size='small' 
                                avatar 
                                style={{ borderRadius: "50%" }}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <ArticleList 
                        articles={articles} 
                        title="My Articles" 
                        paginating
                    />
                </Grid>
            </Container>
        </Segment>
    );
};

export const mapStateToProps = state => {
    return {
        profileState: state.profile,
        articlesState: state.articles
    };
};

UserProfile.propTypes = {
    profileState: PropTypes.object.isRequired,
    articlesState: PropTypes.object.isRequired,
    onDismissHandler: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(UserProfile);
