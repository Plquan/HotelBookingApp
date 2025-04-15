import http from "@/utils/axios/axiosCustom";
import { IBookingRequestData, ICheckDate } from "@/interfaces/booking/IBookingType";
import { IRoomTypeData } from "@/interfaces/roomType/IRoomDTO";
import { IResponseBase } from "@/interfaces/IResponseBase";
import { IPaymentData } from "@/interfaces/booking/IBookingType";

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
const payment = async (params: IBookingRequestData): Promise<IResponseBase<any>> => {
  try {
     const response: IResponseBase<any> = await http.post("/api/Booking/PlaceOrder",params)
     return response
  } catch (error: any) {
    throw error.response.data;
  }
}  
  
const bookingServices = {
    checkRoom,
    getRoomDetail,
    payment
}
export default bookingServices