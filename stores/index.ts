import { configureStore } from '@reduxjs/toolkit';
import { roomTypeSlice } from './roomTypeStore/roomTypeReducer';
import { bookingSlice } from './bookingStore/bookingReducer';
export const store = configureStore({ 
reducer:{
 roomTypeStore: roomTypeSlice.reducer,
 bookingStore: bookingSlice.reducer
}
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;