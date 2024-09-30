import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice.ts"; 

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
