import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: "http://localhost:8082",
});

axiosClient.interceptors.request.use(async (config) => {
  const access_token = Cookies.get("__token");
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  } else {
    console.log('JWT token is not available');
  }
  config.headers["Content-Type"] = "application/json";
  return config;
}, error => {
  return Promise.reject(error);
});

export default axiosClient;
