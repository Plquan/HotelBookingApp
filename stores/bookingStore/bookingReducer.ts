import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import bookingThunks from "./bookingThunk";
import { IRoomTypeData } from "@/interfaces/roomType/IRoomDTO";
import { IBookingRequestData } from "@/interfaces/booking/IBookingType";

interface BookingState {
  loading: boolean;
  error: string | null;
  bookingData: IBookingRequestData;
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
    }
  },
  extraReducers: (builder) => {
    // Thêm các case async nếu cần
  },
});

export const bookingAction = {
  ...bookingSlice.actions,
  ...bookingThunks,
};
export default bookingSlice.reducer;
