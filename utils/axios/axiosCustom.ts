import axios from "axios";
import env from "@/constants/envConstant";
import accessToken from "@/utils/functions/accessToken";


const http = axios.create({
  baseURL: env.API_URL,
  withCredentials: true,
});
http.interceptors.request.use((config) => {
  // if (getAccessToken() !== undefined) {
  //   config.headers.Authorization = "Bearer " + String(getAccessToken());
  // }
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