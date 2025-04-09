import { createSlice } from "@reduxjs/toolkit";
import bookingThunks from "./bookingThunk";
import { IRoomTypeData } from "@/interfaces/roomType/IRoomDTO";
interface BookingState {
    fromDate: string;
    toDate: string;
    loading: boolean;
    error: string | null;
    availableRoom?: IRoomTypeData[];
}

const initialState: BookingState = {
    fromDate: new Date().toISOString(),
    toDate: new Date().toISOString(),
    loading: false,
    error: null,
    availableRoom: [],
};

export const bookingSlice = createSlice({
name: "booking",
initialState,
reducers: {
    setFromDate: (state, action) => {
        state.fromDate = action.payload;
    },
    setToDate: (state, action) => {
        state.toDate = action.payload;
    },
},
extraReducers: (builder) => {
    builder 
       .addCase(bookingThunks.checkRoom.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(bookingThunks.checkRoom.fulfilled, (state, action) => {
            state.loading = false;
            state.availableRoom = action.payload.data ?? [];
        })
        .addCase(bookingThunks.checkRoom.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
},

})
export const bookingAction = {
    ...bookingSlice.actions,
    ...bookingThunks
}
export default bookingSlice.reducer;