import API from "../api/axiosConfig";

export const getProfile = (id) => {

    return API.get(
        `/users/profile/${id}`
    );

};

export const updateProfile = (id, data) => {

    return API.put(
        `/users/profile/${id}`,
        data
    );

};