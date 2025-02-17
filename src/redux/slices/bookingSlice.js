import { createSlice } from "@reduxjs/toolkit";
import { calculateNights } from "../../utils/helper";

const initialState = {
  from: null,
  to: null,
  nights: 0,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setDates: (state, action) => {
      const { from, to } = action.payload;
      state.from = from;
      state.to = to;
      state.nights = from && to ? calculateNights(from, to) : 0;
    },
    clearBooking: (state) => {
      state.from = null;
      state.to = null;
      state.nights = 0;
    },
  },
});

export const { setDates, clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
