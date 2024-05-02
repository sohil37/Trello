import { configureStore } from "@reduxjs/toolkit";

import appStateReducer from "../reducers/appDataSlice"; //importing appState reducer logics

export const store = configureStore({
  reducer: {
    appState: appStateReducer, //assigning all states to store
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
