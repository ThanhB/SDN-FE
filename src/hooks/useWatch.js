import { create } from "zustand";
import { getWatchList , getwatchDetail, getWatchByBrand , getWatchByName} from "../api/watch";

const useWatch = create((set) => ({
  watchList: [],
  status: null,
  fetchWatchList: async () => {
    try {
      const response = await getWatchList();
      if (response && response.status === 200) {
        set({ watchList: response.data.data || [] });
      }
    } catch (error) {
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

  searchWatchList:[],
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
  }
}));

export default useWatch;
