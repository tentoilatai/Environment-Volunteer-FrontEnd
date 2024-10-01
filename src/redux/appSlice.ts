import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { optionType } from "../Common/Input/DropDown/DropDownField";


interface AppState {
  selected1: optionType | null;
  inputValue: string;
}

const initialState: AppState = {
  selected1: null,
  inputValue: "",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSelected1: (state, action: PayloadAction<optionType | null>) => {
      state.selected1 = action.payload;
    },
    setInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload;
    },
  },
});

export const appActions = appSlice.actions;
export const appReducer = appSlice.reducer;