import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthInfor, DataLoginType } from "../../AxiosConfig/DataType";

const initialState: AuthInfor = {
  isAuth: false,
  info: null,
  // unique_name: "",
  // userId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setInfo: (state, action: PayloadAction<DataLoginType | null>) => {
      state.info = action.payload;
    },
    // setUserId: (state, action: PayloadAction<string>) => {
    //   state.userId = action.payload;
    // },
    // setUnique_name: (state, action: PayloadAction<string>) => {
    //   state.unique_name = action.payload;
    // },
    ///
   
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
