import { create } from "zustand";
import {
  getWatchList,
  getwatchDetail,
  getWatchByBrand,
  getWatchByName,
  createWatch,
  updateWatch,
  deleteWatch,
} from "../api/watch";
import { notification } from "antd";

const useWatch = create((set) => ({
  watchList: [],
  status: null,
  isLoadingWatchList: false,
  TotalWatchElements: "",
  fetchWatchList: async () => {
    try {
      set({ isLoadingWatchList: true }); // reset status here
      const response = await getWatchList();
      if (response && response.status === 200) {
        set({ watchList: response.data.data || [] });
        set({ TotalWatchElements: response.data.data.totalElements || "" });
      }
      set({ isLoadingWatchList: false });
    } catch (error) {
      set({ isLoadingWatchList: false });
      console.error("Error fetching data:", error);
    }
  },

  watchDetail: {},
  fetchWatchDetail: async (id) => {
    try {
      const response = await getwatchDetail(id);
      if (response && response.status === 200) {
        set({ watchDetail: response.data.data || {} });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  filerWatchlist: [],
  isLoadingWatchList: false,
  fetchWatchByBrand: async (id) => {
    try {
      set({ isLoadingWatchList: true });
      const response = await getWatchByBrand(id);
      if (response && response.status === 200) {
        set({ filerWatchlist: response.data.data || [] });
      }
      set({ isLoadingWatchList: false });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  searchWatchList: [],
  isLoadingSearchWatchList: false,
  fetchWatchByName: async (name) => {
    try {
      set({ isLoadingSearchWatchList: true, status: null }); // reset status here
      const response = await getWatchByName(name);
      if (response && response.status === 200) {
        set({ searchWatchList: response.data.data || [] });
      }
      set({ isLoadingSearchWatchList: false });
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response && error.response.status === 404) {
        set({ status: error.response.data.statusCode });
      }
    }
  },

  fetchCreateWatch: async (data) => {
    try {
      const response = await createWatch(data);
      console.log(response)
      if (response && response.status === 200) {
        set({ status: response.status });
        notification.success({
          message: "Success",
          description: "Watch created successfully",
          duration: 1,
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Error creating watch",
        duration: 1,
      });
    }
  },

  fetchUpdateWatch: async (id, data) => {
    try {
      const response = await updateWatch(id, data);
      if (response && response.status === 200) {
        set({ status: response.status });
        notification.success({
          message: "Success",
          description: "Watch updated successfully",
          duration: 1,
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Error updating watch",
        duration: 1,
      });
    }
  },

  fetchDeleteWatch: async (id) => {
    try {
      const response = await deleteWatch(id);
      if (response && response.status === 200) {
        set({ status: response.status });
        notification.success({
          message: "Success",
          description: "Watch deleted successfully",
          duration: 1,
        });
      }
      return response;
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Error deleting watch",
        duration: 1,
      });
      throw error;
    }
  },
}));

export default useWatch;
