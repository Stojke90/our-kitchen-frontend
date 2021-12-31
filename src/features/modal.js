import { createSlice } from "@reduxjs/toolkit";

// state for open and close modal
const initialStateValue = false;

export const modalSlice = createSlice({
  name: "modal",
  initialState: { value: initialStateValue },
  reducers: {
    openModal: (state, action) => {
      state.value = action.payload;
    },

    closeModal: (state) => {
      state.value = initialStateValue;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
