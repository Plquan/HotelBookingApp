import http from "@/utils/axios/axiosCustom";
import { ICheckDate } from "@/interfaces/booking/IBookingType";
import { IRoomTypeData } from "@/interfaces/roomType/IRoomDTO";
import { IResponseBase } from "@/interfaces/IResponseBase";

const checkRoom = async (params: ICheckDate): Promise<IResponseBase<IRoomTypeData[]> | undefined> => {
    try {
      const response : IResponseBase<IRoomTypeData[]> = await http.post("/api/Booking/CheckRoom",params)
      return response;
    } catch (error: any) {
      console.log("API lỗi", error.response?.data || error.message);
      return undefined;
    }
  };
  
const getRoomDetail = async (id: number): Promise<IResponseBase<IRoomTypeData> | undefined> => {
  try {
     const response: IResponseBase<IRoomTypeData> = await http.get(`/api/RoomType/GetById/${id}`)
     return response
  } catch (error: any) {
    console.log("API lỗi", error.response?.data || error.message);
    return undefined;
  }
}  
  
const bookingServices = {
    checkRoom,
    getRoomDetail
}
export default bookingServices