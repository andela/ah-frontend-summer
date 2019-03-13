import axios from "axios";
import { loginUser, failedLoginUser } from "../sync/login";

export const loginFetch = payload => {
    return async dispatch => {
        try {
            const response = await axios.post(payload.url, payload.data);
            dispatch(loginUser(response.data));
            localStorage.setItem("username", response.data.user.username);
            localStorage.setItem("token", response.data.user.token);
            payload.history.push("/");
        } catch (error) {
            if (error.response.status === 400) {
                dispatch(failedLoginUser());
            }
        }
    };
};
