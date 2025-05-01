import { createSlice } from "@reduxjs/toolkit";
import { ICurrentUser } from "@/interfaces/auth/AuthType";
import {getAccessToken,removeAccessToken} from "@/utils/functions/accessToken";
import { authThunks } from "./authThunk";
import Toast from "react-native-toast-message";
export interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    currentUser: ICurrentUser | null;

  }
  
  const initialState: AuthState = {
    token: getAccessToken()?.toString() || null,
    isAuthenticated: false,
    loading: false,
    error: null,
    currentUser: null,
  };

  export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout:(state) => {
            state.token = null;
            state.isAuthenticated = false;
            state.currentUser = null;
            removeAccessToken();
        },
        updateCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(authThunks.getCurrentUser.pending, (state) => {
            state.loading = true;
          })
          .addCase(authThunks.getCurrentUser.fulfilled, (state, action) => {
            state.currentUser = action.payload.data ?? null;
            state.isAuthenticated = true;
            state.loading = false;
          })
          .addCase(authThunks.getCurrentUser.rejected, (state) => {
            state.isAuthenticated = false;
            state.loading = false;
          });

        builder
          .addCase(authThunks.updateProfile.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(authThunks.updateProfile.fulfilled, (state, action) => {

              state.currentUser = action.payload.data ?? state.currentUser;
              state.loading = false;
            })
            .addCase(authThunks.updateProfile.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload as string;
            });
    }
  })

  export const authAction = {
    ...authSlice.actions,
    ...authThunks,
  };
  
  export default authSlice.reducer;