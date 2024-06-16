import { create } from "zustand";
import { feedBack } from "../api/comment";
import { notification } from "antd";

const useComment = create((set) => ({

    fetchCreateComment: async ({ id, value}) => {
        console.log("check value", value);
        try {
            const response = await feedBack(id, value);
            if (response && response.status === 200) {
                set({ status: response.status });
                notification.success({
                    message: "Success",
                    description: "Comment successfully!",
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
        }
    },
}));

export default useComment;