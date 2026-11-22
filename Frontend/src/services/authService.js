import API from "../api/axiosConfig";

export const loginUser = (data) => {

    return API.post(
        "/users/login",
        data
    );
};

export const registerUser = (data) => {

    return API.post(
        "/users/register",
        data
    );
};