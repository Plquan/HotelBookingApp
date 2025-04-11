import http from "@/utils/axios/axiosCustom";
import { ICheckDate } from "@/interfaces/booking/IBookingType";
import { IRoomTypeData } from "@/interfaces/roomType/IRoomDTO";
import { IResponseBase } from "@/interfaces/IResponseBase";

const checkRoom = async (params: ICheckDate): Promise<IResponseBase<IRoomTypeData[]> | undefined> => {
    try {
      const response : IResponseBase<IRoomTypeData[]> = await http.post("/api/Booking/CheckRoom",params)
      return response;
    } catch (error: any) {
      throw error.response.data;
    }
  };
  
const getRoomDetail = async (id: number): Promise<IResponseBase<IRoomTypeData> | undefined> => {
  try {
     const response: IResponseBase<IRoomTypeData> = await http.get(`/api/RoomType/GetById/${id}`)
     return response
  } catch (error: any) {
    throw error.response.data;
  }
}  
  
const bookingServices = {
    checkRoom,
    getRoomDetail
}
export default bookingServices