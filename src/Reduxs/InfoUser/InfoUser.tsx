import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiResponseUserDetails, infoType } from "../../AxiosConfig/DataType";

const initialState: apiResponseUserDetails = {
  result: null,
};

const userDetailsSlice = createSlice({
  name: "info-account",
  initialState,
  reducers: {
    setInfoUserDetails: (state, action: PayloadAction<infoType | null>) => {
      state.result = action.payload;
    },
  },
});

export const userDetailsActions = userDetailsSlice.actions;
export const userDetailsReducer = userDetailsSlice.reducer;
