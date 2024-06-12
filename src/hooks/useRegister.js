import { create } from "zustand";
import { register } from "../api/authen";
const useSignup = create((set) => ({
  addNewUser: {},
  fetchRegister: async (membername, password, name, YOB, isAdmin = false) => {
    try {
      const response = await register(membername, password, name, YOB, isAdmin);
      if (response && response.status === 200) {
        set({ addNewUser: response.data });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
}));
export default useSignup;
