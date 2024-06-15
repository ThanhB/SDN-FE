import { create } from "zustand";
import { editUser, getUserDetail, getUserList, changePassword } from "../api/user";
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
      console.log("error", error);
      notification.error({
        message: "Error",
        description: error.response.data.message,
        duration: 1,
      });
    }
  },

  fetchChangePassword: async (id, value) => {
    try {
      const response = await changePassword(id, value);
      if (response && response.status === 200) {
        notification.success({
          message: "Success",
          description: response.data.message,
          duration: 1,
        });
      }
      return response;
    } catch (error) {
      console.log("error", error);
      notification.error({
        message: "Error",
        description: error.response.data.message,
        duration: 1,
      });
      throw error;
    }
  },

}));

export default useUser;
