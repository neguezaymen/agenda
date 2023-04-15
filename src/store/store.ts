
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { appointementsSlice } from "../slices/appointementSlice";
import { UISlice } from "../slices/UiSlice";


const store = configureStore({
  middleware:getDefaultMiddleware({
    serializableCheck: false
  }),
  reducer: {
    appointements: appointementsSlice.reducer,
    uiSlice: UISlice.reducer,

  },
});
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch

export default store;
