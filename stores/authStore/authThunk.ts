import http from "@/utils/axios/axiosCustom";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICurrentUser } from "@/interfaces/auth/AuthType";
import { IResponseBase } from "@/interfaces/IResponseBase";
import { IUpdateProfileData } from "@/interfaces/account/IAccountType";

const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async (_, { rejectWithValue }): Promise<IResponseBase<ICurrentUser | null>> => {
      try {
        const user: IResponseBase<ICurrentUser> = await http.get("/api/Auth/GetMe");
        return user;
      } catch (error: any) {
        return rejectWithValue(error.response.data) as any;
      }
    }
  );
  const updateProfile = createAsyncThunk(
    "account/updateProfile",
    async (params: IUpdateProfileData, { rejectWithValue }): Promise<IResponseBase<ICurrentUser | null>> => {
      try {
        const res: IResponseBase<ICurrentUser> = await http.post("/api/Account/UpdateProfile",params);
        return res;
      } catch (error: any) {
        return rejectWithValue(error.response.data) as any;
      }
    }
  );

  export const authThunks = {
    getCurrentUser,
    updateProfile,
  };