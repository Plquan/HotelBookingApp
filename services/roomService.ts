import http from "@/utils/axios/axiosCustom";

import { IResponseBase } from "@/interfaces/IResponseBase";

const saveRoom = async (params: number): Promise<IResponseBase<any>> => {
    try {
        const res: IResponseBase<any> = await http.post("/api/RoomType/SaveRoom",params)
        return res
    } catch (error: any) {
        throw error.response.data;
    }
}


const roomServices = {
    saveRoom
}

export default roomServices

