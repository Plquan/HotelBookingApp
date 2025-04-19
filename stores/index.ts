import { configureStore } from '@reduxjs/toolkit';
import { roomTypeSlice } from './roomTypeStore/roomTypeReducer';
import { bookingSlice } from './bookingStore/bookingReducer';
import { authSlice } from './authStore/authReducer';
export const store = configureStore({ 
reducer:{
 roomTypeStore: roomTypeSlice.reducer,
 bookingStore: bookingSlice.reducer,
 authStore: authSlice.reducer
}
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;