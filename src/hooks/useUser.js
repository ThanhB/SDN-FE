import { create } from "zustand";
import { editUser, getUserDetail, getUserList } from "../api/user";

const useUser = create((set) => ({
    userList: [],
    fetchUserList: async () => {
       try{
        const response = await getUserList();
        if (response && response.status === 200) {
            set({ userList: response.data.data || [] });
          }
       }catch(error){
           console.error("Error fetching data:", error);
       }
    },

    userDetail: {},
    fetchUserDetail: async (id) => {
        try{
            const response = await getUserDetail(id);
            if (response && response.status === 200) {
                set({ userDetail: response.data.data || {} });
              }
        }catch(error){
            console.error("Error fetching data:", error);
        }
    },

    updateUser: async (id, value) => {
        try {
            console.log(`Updating user with id: ${id} and value: ${JSON.stringify(value)}`);
            const response = await editUser(id, value);
            if (response && response.status === 200) {
                set({ userDetail: response.data.data || {} });
            } else {
                console.error(`Unexpected server response: ${JSON.stringify(response)}`);
            }
        } catch(error) {
            console.error("Error fetching data:", error);
        }
    }
}));

export default useUser;