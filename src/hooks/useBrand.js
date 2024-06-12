import { create } from "zustand";
import { getBrandList, getBrandDetail } from "../api/brand";

const useBrand = create((set) => ({
    brandList: [],
    fetchBrandList: async () => {
        try {
        const response = await getBrandList();
        if (response && response.status === 200) {
            set({ brandList: response.data.data || [] });
        }
        } catch (error) {
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
        } catch (error) {
        console.error("Error fetching data:", error);
        }
    },
}));

export default useBrand;