import axiosClient from "../config/axiosClient";

const feedBack = () => {
    return axiosClient.post("api/comment");
}

export {feedBack}