import { createSlice } from "@reduxjs/toolkit";
import { calculateNights } from "../../utils/helper";

const initialState = {
  from: null,
  to: null,
  date: null,
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
    setDate: (state, action) => {
      const { date } = action.payload;
      state.date = date;
    },
    clearBooking: (state) => {
      state.from = null;
      state.to = null;
      state.nights = 0;
    },
  },
});

export const { setDates, clearBooking, setDate } = bookingSlice.actions;
export default bookingSlice.reducer;
