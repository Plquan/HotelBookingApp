import http from "@/utils/axios/axiosCustom";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICheckDate } from "@/interfaces/booking/IBookingType";

const checkRoom = createAsyncThunk(
  "booking/checkRoom",
    async (params: ICheckDate, { rejectWithValue }) => {
        try {
        const response = await http.post("/api/Booking/CheckRoom", params);
        return response;
        } catch (error: any) {
        console.log("error find room", error);
        return rejectWithValue(error.data) as any;
        }
    }
)
const bookingThunks = {
  checkRoom
}
export default bookingThunks;