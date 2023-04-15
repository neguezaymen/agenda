import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

export interface AppointementState {
  id: number;
  buyer: string | undefined;
  vendor: string | undefined;
  company: string | undefined;
  date: Date;
  duration: number;
  time: string;
}

const initialState: AppointementState[] = [];

export const appointementsSlice = createSlice({
  name: "appointement",
  initialState,
  reducers: {
    addAppointement: (state, action: PayloadAction<AppointementState>) => {
      state.push(action.payload);
    },
    deleteAppointement: (state, action: PayloadAction<number>) => {
      return state.filter((el) => el.id !== action.payload);
    },
    editAppointement: (state, action: PayloadAction<AppointementState>) => {
      return state.map((el) =>
        el.id !== action.payload.id ? el : action.payload
      );
    },
  },
});

export const { addAppointement, deleteAppointement, editAppointement } =
  appointementsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const appointement = (state: RootState) => state.appointements;

export default appointementsSlice.reducer;
