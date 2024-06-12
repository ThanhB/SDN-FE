import axiosClient from "../config/axiosClient";

const getBrandList = () => {
    return axiosClient.get("api/brand");
}

const getBrandDetail = (id) => {
    return axiosClient.get(`api/brand/${id}`);
}

const updateBrand = (id, data) => {
    return axiosClient.put(`/api/brand/${id}`, data);
}

const deleteBrand = (id) => {
    return axiosClient.delete(`/api/brand/${id}`);
}

export { getBrandList, getBrandDetail, updateBrand, deleteBrand}