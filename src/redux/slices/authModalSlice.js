import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  currentStep: 1,
  previousStep: null,
  errorMessage: "",
};

const authModalSlice = createSlice({
  name: "authModal",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.previousStep = state.currentStep;
      state.currentStep = action.payload;
    },
    openAuthModal: (state) => {
      state.show = true;
    },
    closeAuthModal: (state) => {
      state.show = false;
      state.errorMessage = "";
    },
    resetModal: (state) => {
      state.currentStep = 1;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  openAuthModal,
  closeAuthModal,
  setStep,
  setErrorMessage,
  resetModal,
} = authModalSlice.actions;

export default authModalSlice.reducer;
