import http from "@/utils/axios/axiosCustom";
import { ILoginRequestData, ILoginResponseData } from "@/interfaces/auth/LoginType";
import { IResponseBase } from "@/interfaces/IResponseBase";

const login = async (params: ILoginRequestData): Promise<IResponseBase<ILoginResponseData>> => {
    try {
        const response: IResponseBase<ILoginResponseData> = await http.post("/api/Auth/Login",params)
        return response;
    } catch (error:any) {
        throw error.response.data;
    }
}
const logout = async (): Promise<IResponseBase<any>> => {
    try {
      const response: IResponseBase<any> = await http.post("/api/Auth/Logout");
      return response;
    } catch (error: any) {
        throw error.response.data;
    }
  };
  

const authSevices = {
    login,
    logout
}
export default authSevices