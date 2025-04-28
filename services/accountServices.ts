import http from "@/utils/axios/axiosCustom";
import { IChangePasswordData } from "@/interfaces/account/IAccountType";
import { IResponseBase } from "@/interfaces/IResponseBase";

const changePassword = async (params: IChangePasswordData): Promise<IResponseBase<any>> => { 
    try {
        const response: IResponseBase<any> = await http.post("/api/Account/ChangePassword", params);
        return response;
    } catch (error: any) {
        throw error.response.data;
    }
}

const accountServices = {
    changePassword,
}
export default accountServices;