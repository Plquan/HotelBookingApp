import http from "@/utils/axios/axiosCustom";
import { ILoginRequestData, ILoginResponseData } from "@/interfaces/auth/LoginType";
import { IResponseBase } from "@/interfaces/IResponseBase";
import { IRegisterRequestData,IConfirmEmailRequestData } from "@/interfaces/auth/Register";

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

const register = async (params: IRegisterRequestData): Promise<IResponseBase<any>> => {
    try {
        const response: IResponseBase<any> = await http.post("/api/Auth/Register",params);
        return response;
    } catch (error:any) {
        throw error.response.data;
    }
}  

const confirmEmail = async (params: IConfirmEmailRequestData): Promise<IResponseBase<any>> => {
    try {
        const response: IResponseBase<any> = await http.post("/api/Auth/ConfirmEmailAsync",params);
        return response
    } catch (error:any) {
        throw error.response.data;
    }
}

const resendCode = async(params: any): Promise<IResponseBase<any>> => {
    try {
        const response: IResponseBase<any> = await http.get(`/api/Auth/ResendCodeConfirmEmailAsync?email=${params}`);
        return response
    }catch (error:any) {
        throw error.response.data;
    }
}

const authSevices = {
    login,
    logout,
    register,
    confirmEmail,
    resendCode
}
export default authSevices