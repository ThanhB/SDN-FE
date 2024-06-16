import axiosClient from "../config/axiosClient";

const feedBack = (id, data) => {
    console.log("check data, id", data, id);
    return axiosClient.post(`/api/watch/comment/${id}`, data);
}

export {feedBack}