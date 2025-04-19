import axios from "axios";
import env from "@/constants/envConstant";
import accessToken from "../functions/accessToken";

const http = axios.create({
  baseURL: env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
http.interceptors.request.use(async (config) => {
  const token = await accessToken.getAccessToken()
  if (token !== undefined) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});
http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // window.location.href = "/login";
    }
    return await Promise.reject(error);
  }
);
export default http;