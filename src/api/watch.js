import axiosClient from "../config/axiosClient";

const getWatchList = () => {
    return axiosClient.get("api/watch");
}

const getwatchDetail = (id) => {
    return axiosClient.get(`api/watch/${id}`);
}

const getWatchByName = (name) => {
    return axiosClient.get(`api/watch/search/${name}`);
  }
const getWatchByBrand = (id) => {
    return axiosClient.get(`/api/watch/brand/${id}`);
}

const updateWatch = (id, data) => {
    return axiosClient.put(`/api/update-watch/${id}`, data);
}

const deleteWatch = (id) => {
    return axiosClient.delete(`/api/delete-watch/${id}`);
}

const createWatch = (data) => {
    return axiosClient.post(`/api/create-watch`, data);
}

const getCommentListByWatch = (id) => {
    return axiosClient.get(`/api/watch/comment/${id}`);
}


export { getWatchList, getwatchDetail, getWatchByBrand, getWatchByName, updateWatch, deleteWatch, createWatch, getCommentListByWatch}