import http from "@/utils/axios/axiosCustom";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICheckDate } from "@/interfaces/booking/IBookingType";
import { IResponseBase } from "@/interfaces/IResponseBase";
import { IBookedData } from "@/interfaces/booking/IBookedType";


const getBooked = createAsyncThunk(
  "booking/getBooked",
    async (_, { rejectWithValue }): Promise<IResponseBase<IBookedData[]>> => {
        try {
        const response: IResponseBase<IBookedData[]> = await http.get("/api/Booking/GetBooked");
        console.log(response)
        return response;
        } catch (error: any) {
        console.log("error find room", error);
        return rejectWithValue(error.data) as any;
        }
    }
)

const cancelBooking = createAsyncThunk(
  "booking/cancelBooking",
  async (_, { rejectWithValue }): Promise<IResponseBase<any>> => {
    try {
      const response: IResponseBase<any> = await http.delete(`/api/Booking/CancelBooking`);
      return response;
    } catch (error: any) {
      console.log("error cancel booking", error);
      return rejectWithValue(error.data) as any;
    }
  }
);

const bookingThunks = {
  getBooked,
  cancelBooking
}
export default bookingThunks;