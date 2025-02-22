import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountInfor, DataLoginType } from "../../AxiosConfig/DataType";

const initialState: AccountInfor = {
  isAuth: false,
  info: null,
  departmentid: "",
  departmentName: "",
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
    ///
    setDepartmentid: (state, action: PayloadAction<string>) => {
      state.departmentid = action.payload;
    },
    setDepartmentName: (state, action: PayloadAction<string>) => {
      state.departmentName = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
