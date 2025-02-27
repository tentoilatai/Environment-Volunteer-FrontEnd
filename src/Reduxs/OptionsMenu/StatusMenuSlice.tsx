import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface statusMenu {
  status: boolean;
}

const initialState: statusMenu = {
    status: true
};

const statusMenuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setMenustatus: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload;
    },
  },
});

export const statusMenuActions = statusMenuSlice.actions;
export const statusMenuReducer = statusMenuSlice.reducer;
