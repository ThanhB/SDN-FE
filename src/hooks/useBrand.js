import { create } from "zustand";
import { getBrandList, getBrandDetail, createBrand, updateBrand, deleteBrand } from "../api/brand";
import { notification } from "antd";

const useBrand = create((set) => ({
  brandList: [],
  TotalBrandElement: null,
  isLoadingBrandList: false,
  fetchBrandList: async () => {
    try {
      const response = await getBrandList();
      set({ isLoadingBrandList: true });
      if (response && response.status === 200) {
        set({ brandList: response.data.data || [] });
        set({ TotalBrandElement: response.data.data.length || 0 });
        set({ isLoadingBrandList: false });
      }
      return response;
    } catch (error) {
      set({ isLoadingBrandList: false });
      console.error("Error fetching data:", error);
    }
  },

  brandDetail: {},
  fetchBrandDetail: async (id) => {
    try {
      const response = await getBrandDetail(id);
      if (response && response.status === 200) {
        set({ brandDetail: response.data.data || {} });
      }
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  fetchCreateBrand: async (values) => {
    try {
      const response = await createBrand(values);
      console.log("response", response)
      if(response && response.status === 201){
        set({ status: response.status });
        notification.success({
          message: "Success",
          description: "Brand created successfully",
          duration: 1,
        });
      }
      return response;
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Error creating brand",
        duration: 1,
      });
      throw error;
    }
  },

  fetchUpdateBrand: async (id, values) => {
    console.log("values", values);
    try {
      const response = await updateBrand(id, values);
      if (response && response.status === 200) {
        notification.success({
          message: "Success",
          description: response.data.message,
          duration: 1,
        });
      }
      return response;
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.response.data.message,
        duration: 1,
      });
      throw error;
    }
  },

  fetchDeleteBrand: async (id) => {
    try {
      const response = await deleteBrand(id);
      if (response && response.status === 200) {
        notification.success({
          message: "Success",
          description: "Brand deleted successfully",
          duration: 1,
        });
      }
      return response;
    } catch (error) {
      notification.error({
        message: "Delete Failed",
        description: error.response.data.message,
        duration: 1,
      });
      throw error;
    }
  }
}));

export default useBrand;
