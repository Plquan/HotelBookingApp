import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import bookingThunks from "./bookingThunk";
import { IRoomTypeData } from "@/interfaces/roomType/IRoomDTO";
import { IBookingRequestData } from "@/interfaces/booking/IBookingType";
import { ISelectedRoom } from "@/interfaces/booking/IBookingType";
import { IBookedData } from "@/interfaces/booking/IBookedType";
import { Toast } from "react-native-toast-message/lib/src/Toast";

interface BookingState {
  loading: boolean;
  error: string | null;
  bookingData: IBookingRequestData;
  selectedRoom: ISelectedRoom[];
  bookedRoom: IBookedData[];
}

const defaultBookingData: IBookingRequestData = {
  id: 0,
  appUserId: null,
  userName: "",
  email: "",
  phone: "",
  note: "",
  totalPrice: 0,
  paymentMethod: "",
  confirmBy: "",
  chooseRooms: [],
  fromDate: new Date().toISOString(),
  toDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
  totalPerson: 1,
};

const initialState: BookingState = {
  loading: false,
  error: null,
  bookingData: { ...defaultBookingData },
  selectedRoom: [],
  bookedRoom: [],
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBookingData: (state, action: PayloadAction<Partial<IBookingRequestData>>) => {
      state.bookingData = {
        ...state.bookingData,
        ...action.payload,
      };
    },
    resetBookingData: (state) => {
      const now = new Date().toISOString();
      state.bookingData = {
        fromDate: now,
        toDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
      } as IBookingRequestData;
    },
    setSelectedRoom: (state, action: PayloadAction<ISelectedRoom[]>) => {
      state.selectedRoom = action.payload;
    },
    updateBookedRoomStatus: (state, action) => {
      const { bookingId, status } = action.payload;
    
      const booking = state.bookedRoom.find(b => b.id === bookingId);
      if (booking) {
        booking.status = status;
      }
    },
      resetBookedRoomData:(state) => {
          state.bookedRoom = []
        }
    // setBookedRoom: (state, action: PayloadAction<IBookedData[]>) => {
    //   state.bookedRoom = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookingThunks.getBooked.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookingThunks.getBooked.fulfilled, (state, action) => {
        state.bookedRoom = action.payload.data ?? [];
        state.loading = false;
        state.error = null;
      })
      .addCase(bookingThunks.getBooked.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch booked rooms";
      })
      .addCase(bookingThunks.cancelBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })


      .addCase(bookingThunks.cancelBooking.fulfilled, (state, action) => {
        const booking = state.bookedRoom.find(b => b.id === action.payload.data);
        if (booking) {
          booking.status = 'Cancelled';
        }
        state.loading = false;
        state.error = null;
        Toast.show({
          type: 'success',
          text1: 'Hủy đặt phòng thành công',
        });
      })
      .addCase(bookingThunks.cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to cancel booking";
        Toast.show({
          type: 'error',
          text1: action.error.message,
        });
      });
  },
});

export const bookingAction = {
  ...bookingSlice.actions,
  ...bookingThunks,
};
export default bookingSlice.reducer;
