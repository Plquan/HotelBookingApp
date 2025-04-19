import http from "@/utils/axios/axiosCustom";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IResponseBase } from "@/interfaces/IResponseBase";
import { IRoomTypeData } from "@/interfaces/roomType/IRoomDTO";

const getRoomTypeData = createAsyncThunk (
    "roomType/getRoomTypeData",
     async (_, { rejectWithValue }): Promise<IResponseBase<IRoomTypeData[]>> => {
        try {
            const response : IResponseBase<IRoomTypeData[]> = await http.get("/api/RoomType/GetAll");
            return response;
        } catch (error: any) {
            console.log( 'error roomType',error);
            return rejectWithValue(error.data) as any;
        }
     }
)

const roomTypeThunks = {
    getRoomTypeData
}
export default roomTypeThunks;