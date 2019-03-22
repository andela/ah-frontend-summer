import React from 'react';
import { 
    Form, 
    Button, 
    Grid, 
    Image, 
    Icon, 
    Segment, 
    Container, 
    GridColumn 
} from "semantic-ui-react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../../assets/styles/SignupForm.scss';
import '../../assets/styles/Profile.scss';

const EditProfile = props => {
    const { 
        onSubmitHandler, 
        profile, 
        imageHandler, 
        onChangeHandler, 
        firstName, 
        lastName, 
        bio, 
        profileLoading, 
        loadingEditButton, 
        disabled 
    } = props;

    return (
        <Container>
            <Segment padded="very" loading={profileLoading} color='teal'>
                <Grid columns={2}>
                    <GridColumn>
                        <Form onSubmit={onSubmitHandler}>
                            <Container textAlign="left">
                                <div className='spaceComponents'>
                                    <Form.Input 
                                        fluid 
                                        placeholder='First Name' 
                                        value={firstName} 
                                        name="firstName" 
                                        onChange={onChangeHandler}
                                    />
                                    <Form.Input 
                                        fluid 
                                        placeholder='Last Name' 
                                        value={lastName} 
                                        name="lastName" 
                                        onChange={onChangeHandler}
                                    />
                                    <textarea 
                                        placeholder='Bio' 
                                        value={bio} 
                                        name="bio" 
                                        onChange={onChangeHandler}
                                    />
                                    <Button
                                        basic
                                        color='teal'
                                        type='submit'
                                        loading={loadingEditButton}
                                        disabled={disabled}
                                        className="UpdateButton"
                                    >
                                        Edit Profile
                                    </Button>
                                    <Link to={`/${profile.username}`}>
                                        <Button color='teal'>Cancel</Button>
                                    </Link>
                                </div>
                            </Container>
                        </Form>
                    </GridColumn>
                    <GridColumn>
                        <Container textAlign="right">
                            <Image 
                                src={profile.image} 
                                size='small' 
                                avatar 
                                style={{ borderRadius: "50%" }} 
                            />
                            <div className="FileUploaderContainer">
                                <input 
                                    className="FileUploader" 
                                    type='file' 
                                    name="image" 
                                    onChange={imageHandler}
                                />
                                <br />
                                <br />
                                <Icon size="large" name="pencil alternate" />
                            </div>
                        </Container>
                    </GridColumn>
                    
                </Grid>
            </Segment>
        </Container>
    );
};

EditProfile.propTypes = {
    onSubmitHandler: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    imageHandler: PropTypes.func.isRequired,
    onChangeHandler: PropTypes.func.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    profileLoading: PropTypes.bool.isRequired,
    loadingEditButton: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired
};


export default EditProfile;
