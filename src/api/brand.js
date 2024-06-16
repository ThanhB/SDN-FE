import axiosClient from "../config/axiosClient";

const getBrandList = () => {
  return axiosClient.get("api/brand");
};

const getBrandDetail = (id) => {
  return axiosClient.get(`api/brand/${id}`);
};

const createBrand = (data) => {
  return axiosClient.post("/api/create-brand", data);
};

const updateBrand = (id, data) => {
  return axiosClient.put(`/api/update-brand/${id}`, data);
};

const deleteBrand = (id) => {
  return axiosClient.delete(`/api/delete-brand/${id}`);
};

export { getBrandList, getBrandDetail, createBrand, updateBrand, deleteBrand };
