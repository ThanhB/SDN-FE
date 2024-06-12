import axiosClient from "../config/axiosClient";

const login = (membername, password) => {
  return axiosClient.post("/api/authen/login", { membername, password });
};

const register = (membername, password, name, YOB, isAdmin = false) => {
  return axiosClient.post("/api/authen/register", {
    membername,
    password,
    name,
    YOB,
    isAdmin,
  });
};


const getInfoUser = () => {
  return axiosClient.get("/api/authen/user/info"); // Removed headers from here as it's already set in the interceptor
};


export { login, register, getInfoUser };
