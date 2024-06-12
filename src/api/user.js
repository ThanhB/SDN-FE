import axiosClient from "../config/axiosClient";

const getUserList = () => {
    return axiosClient.get("/api/accounts");
}

const getUserDetail = (id) => {
    return axiosClient.get(`/api/accounts/${id}`);
}

const editUser = (id, data) => {
    return axiosClient.put(`/api/accounts/${id}`,data);
}

export {getUserList ,editUser, getUserDetail}