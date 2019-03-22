import axios from 'axios';
import { 
    getUserProfile, 
    failedUpdateProfile, 
    updateUserProfile, 
    startedFetchUserProfile, 
    startedrequestEditProfile, 
    failedFetchProfile 
} from '../sync/profiles';

export const fetchUserProfile = payload => {
    return async dispatch => {
        const { username, token } = payload;
        dispatch(startedFetchUserProfile());
        try {
            const response = await axios.get(
                `https://ah-backend-summer-staging.herokuapp.com/api/v1/profiles/${username}`, 
                { headers: { Authorization: `Bearer ${token}` }}
            );
            const userProfile = response.data.profile;
            dispatch(getUserProfile(userProfile));
        } catch (error) {
            const message = "Something went wrong, Please check your internet connection.";
            dispatch(failedFetchProfile({ message }));
        }
    };
};

export const requestEditProfile = payload => {
    return async dispatch => {
        dispatch(startedrequestEditProfile());
        try {
            const fd = new FormData();
            const { username, token, data } = payload;
            const { image, first_name, last_name, bio } = data;
            fd.append("image", image, image.name);
            fd.append("first_name", first_name);
            fd.append("last_name", last_name);
            fd.append("bio", bio);
            const response = await axios.patch(
                `https://ah-backend-summer-staging.herokuapp.com/api/v1/profiles/${username}`, 
                fd, 
                { headers: {Authorization: `Bearer ${token}`}}
            );
            const responseData = response.data;
            dispatch(updateUserProfile({responseData, message: "Edited profile."}));
            localStorage.setItem("username", responseData.profile.username);
            payload.history.push(`/${responseData.profile.username}`);
        } catch (error) {
            const message = "Something went wrong, Please check your internet connection.";
            dispatch(failedUpdateProfile({ message }));
        }
    };
};
