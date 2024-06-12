import Cookies from "js-cookie";
import { create } from "zustand";
import { getInfoUser } from "../api/authen.js";

const useAuth = create((set) => ({
  infoUser: {},
  fetchUserInfo: async () => {
    try {
      const res = await getInfoUser();
      if (res && res.status === 200) {
        set({ infoUser: res?.data.data || {} });
      }
    } catch (err) {
      console.log("Error fetching userInfo", err);
    }
  },
  isAuthenticated: !!Cookies.get("__token"),
  login: () => {
    set({ isAuthenticated: true });
  },
  logout: () => {
    Cookies.remove("__token");
    sessionStorage.removeItem("keys");
    set({ isAuthenticated: false });
    useNavigate()('/');
  },
}));

export default useAuth;
