import http from "@/utils/axios/axiosCustom";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IResponseBase } from "@/interfaces/IResponseBase";
import { IRoomTypeData } from "@/interfaces/roomType/IRoomDTO";
import { ICheckRoomData } from "@/interfaces/booking/IBookingType";

const getRoomTypeData = createAsyncThunk (
    "roomType/getRoomTypeData",
     async (_, { rejectWithValue }): Promise<IResponseBase<IRoomTypeData[]>> => {
        try {
            const response : IResponseBase<IRoomTypeData[]> = await http.get("/api/RoomType/GetAll");
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response.data) as any;
        }
     }
)

const getListSavedRoom = createAsyncThunk (
    "roomType/getListSavedRoom",
    async (_,{rejectWithValue}): Promise<IResponseBase<ICheckRoomData[]>> => {
      try {
        const response: IResponseBase<ICheckRoomData[]> = await http.get("/api/RoomType/GetListSavedRoom")
        return response
      } catch (error: any) {
        return rejectWithValue(error.response.data) as any;
      }
    }
)

const roomTypeThunks = {
    getRoomTypeData,
    getListSavedRoom
}
export default roomTypeThunks;