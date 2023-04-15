import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

interface uiState {
  isModalVisible: boolean;
  isDeleteModalVisible: boolean;
  modalId: number | null;
}

const initialState: uiState = {
  isModalVisible: false,
  modalId: null,
  isDeleteModalVisible: false,
};

export const UISlice = createSlice({
  name: "Uislice",
  initialState,
  reducers: {
    showModal: (state) => {
      state.isModalVisible = true;
    },
    hideModal: (state) => {
      state.isModalVisible = false;
    },
    showDeleteModal: (state) => {
      state.isDeleteModalVisible = true;
    },
    hideDeleteModal: (state) => {
      state.isDeleteModalVisible = false;
    },
    setModalId: (state, action: PayloadAction<number | null>) => {
      state.modalId = action.payload;
    },
  },
});

export const {
  hideModal,
  setModalId,
  showModal,
  hideDeleteModal,
  showDeleteModal,
} = UISlice.actions;

export const UIslice = (state: RootState) => state.appointements;

export default UISlice.reducer;
