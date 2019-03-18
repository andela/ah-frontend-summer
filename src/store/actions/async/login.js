import axios from "axios";
import { loginUser, failedLoginUser, loginStarted } from "../sync/login";

const loginFetch = payload => {
    return async dispatch => {
        dispatch(loginStarted());
        try {
            const response = await axios.post(payload.url, payload.data);
            dispatch(loginUser(response.data));
            localStorage.setItem("username", response.data.user.username);
            localStorage.setItem("token", response.data.user.token);
            payload.history.push("/");
        } catch (error) {
            let errorMsg = "Something went wrong. Please check your internet connection.";
            if(error.response){
                errorMsg = !payload.isSocialLogin ? "Incorrect email or password." : "Something went wrong, please try again.";
            }
            dispatch(failedLoginUser(errorMsg));
        }
    };
};

export default loginFetch;
