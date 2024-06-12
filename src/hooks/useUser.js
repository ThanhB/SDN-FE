import { create } from "zustand";
import { editUser, getUserDetail, getUserList } from "../api/user";
import { notification } from "antd";

const useUser = create((set) => ({
  userList: [],
  isloadingUserList: false,
  userTotalElements: "",
  fetchUserList: async () => {
    try {
      set({ isloadingUserList: true });
      const response = await getUserList();
      if (response && response.status === 200) {
        set({ userList: response.data.data || [] });
        set({ userTotalElements: response?.data?.data || "" });
      }
      set({ isloadingUserList: false });
    } catch (error) {
      set({ isloadingUserList: false });
      console.error("Error fetching data:", error);
    }
  },

  userDetail: {},
  fetchUserDetail: async (id) => {
    try {
      const response = await getUserDetail(id);
      if (response && response.status === 200) {
        set({ userDetail: response.data.data || {} });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },

  updateUser: async (id, value) => {
    try {
      const response = await editUser(id, value);
      if (response && response.status === 200) {
        notification.success({
          message: "Success",
          description: "Update successfully!",
          duration: 1,
        });
        set({ userDetail: response.data.data || {} });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Something went wrong!",
        duration: 1,
      });
    }
  },
}));

export default useUser;
