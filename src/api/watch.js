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
    return axiosClient.put(`/api/watch/${id}`, data);
}

const deleteWatch = (id) => {
    return axiosClient.delete(`/api/watch/${id}`);
}

export { getWatchList, getwatchDetail, getWatchByBrand, getWatchByName, updateWatch, deleteWatch}