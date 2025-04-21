import { createSlice } from "@reduxjs/toolkit";
import { IRoomTypeData } from "@/interfaces/roomType/IRoomDTO";
import roomTypeThunks from "./roomTypeThunk";
import { ICheckRoomData } from "@/interfaces/booking/IBookingType";

interface AreaState {
    roomTypes: IRoomTypeData[];
    savedRoom:ICheckRoomData[];
    loading: boolean;
    error: string | null;
}

const initialState: AreaState = {
    roomTypes: [],
    savedRoom:[],
    loading: false,
    error: null,
};

export const roomTypeSlice = createSlice({
    name: "roomType",
    initialState,
    reducers: {    
        removeSavedRoom: (state, action) => {
            state.savedRoom = state.savedRoom.filter(room => room.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
              .addCase(roomTypeThunks.getRoomTypeData.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
                .addCase(roomTypeThunks.getRoomTypeData.fulfilled, (state, action) => {
                    state.loading = false;
                    state.roomTypes = action.payload.data ?? [];
              })
                .addCase(roomTypeThunks.getRoomTypeData.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload as string;
            });

        builder
              .addCase(roomTypeThunks.getListSavedRoom.pending,(state) => {
                state.loading = true
                state.error = null
              })
              .addCase(roomTypeThunks.getListSavedRoom.fulfilled,(state,action)=> {
                 if(action.payload.isSuccess){
                    state.savedRoom = action.payload.data ?? []
                 }
                 state.loading = false
              })
              .addCase(roomTypeThunks.getListSavedRoom.rejected,(state,action) => {
                state.loading = false;
                state.error = action.payload as string;
              })
    },

});

export const roomTypeAction = {
    ...roomTypeSlice.actions,
    ...roomTypeThunks,
}
export default roomTypeSlice.reducer;